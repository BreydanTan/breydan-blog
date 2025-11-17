# 3D Assets Required

To complete the 3D office scene setup, you need to add the following files to this directory:

## Required Files

### 1. officeScene.glb
- **Type**: 3D Model (GLB format with DRACO compression)
- **Description**: The main 3D office scene model
- **Source**: You can download from the original repository: https://github.com/fangchenjia/my-portfolio-web
- **Path**: Place it in `/public/3D/officeScene.glb`

### 2. kda.mp4 (Optional)
- **Type**: Video file
- **Description**: Video texture for the mac-screen object in the scene
- **Path**: Place it in `/public/3D/kda.mp4`
- **Note**: If not provided, the scene will still work without the video texture

## How to Download from the Original Repository

You can download these files from: https://github.com/fangchenjia/my-portfolio-web

Look for the `/public/3D/` directory in that repository.

## Alternative

If you prefer to use your own 3D model:
1. Create a 3D office scene in Blender or similar software
2. Export as GLB format with DRACO compression
3. Make sure the model includes objects named:
   - "Chair" (will auto-rotate)
   - "mac-screen" (will display video if provided)
4. Place the file as `/public/3D/officeScene.glb`
