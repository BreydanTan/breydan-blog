"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export function OfficeScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chairRef = useRef<THREE.Object3D | null>(null);
  const screenRef = useRef<THREE.Mesh | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Initialize camera
    const camera = new THREE.OrthographicCamera();
    camera.position.set(-9.72, 5.27, -2.25);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Lighting setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.78);
    sunLight.castShadow = true;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.normalBias = 0.05;
    sunLight.position.set(-1.5, 7, 3);
    scene.add(sunLight);

    const pointLight = new THREE.PointLight(0xffffff, 0);
    pointLight.castShadow = true;
    pointLight.position.set(0.6, 4, -2.3);
    pointLight.shadow.camera.far = 20;
    pointLight.shadow.mapSize.set(2048, 2048);
    pointLight.shadow.normalBias = 0.05;
    scene.add(pointLight);

    // Chair animation function
    const chairAnimate = (chair: THREE.Object3D) => {
      gsap.to(chair.rotation, {
        y: 0.7,
        duration: 10,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    // Video texture for screen (optional)
    const setScreen = (screen: THREE.Mesh) => {
      const video = document.createElement("video");
      video.src = "/3D/kda.mp4";
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {
        // Fallback if video fails to load
        console.log("Video playback failed, using default texture");
      });

      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.NearestFilter;
      videoTexture.magFilter = THREE.NearestFilter;
      videoTexture.generateMipmaps = false;
      videoTexture.colorSpace = THREE.SRGBColorSpace;
      screen.material = new THREE.MeshStandardMaterial({ map: videoTexture });
    };

    // Load 3D model
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "/3D/officeScene.glb",
      (glb) => {
        glb.scene.scale.set(1.8, 1.8, 1.8);
        glb.scene.position.y = -1.5;

        glb.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.name === "Chair") {
              chairRef.current = child;
              chairAnimate(child);
            } else if (child.name === "mac-screen") {
              screenRef.current = child;
              setScreen(child);
            }
          }
        });

        scene.add(glb.scene);
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error("Error loading 3D model:", error);
      }
    );

    // Size configuration
    const updateSize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      const aspect = width / height;
      const frustrum = 10;
      const pixelRatio = Math.min(window.devicePixelRatio, 3);

      camera.left = (-aspect * frustrum) / 2;
      camera.right = (aspect * frustrum) / 2;
      camera.top = frustrum / 2;
      camera.bottom = -frustrum / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
    };

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxAzimuthAngle = -1;
    controls.minAzimuthAngle = Math.PI * 1.2;
    controls.maxPolarAngle = Math.PI / 3;
    controls.minPolarAngle = Math.PI / 6;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    // Initialize and start
    updateSize();
    containerRef.current.appendChild(renderer.domElement);
    animate();

    // Handle window resize
    const handleResize = () => {
      updateSize();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }

      // Clean up scene
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material?.dispose();
            }
          }
        });
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
