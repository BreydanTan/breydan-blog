"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { SocialCards } from "@/components/social-cards";
import { OfficeScene3D } from "@/components/OfficeScene3D";
import { config } from "@/lib/config";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-[50vh] md:min-h-[60vh] flex items-center py-8 md:py-12 lg:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-4 md:space-y-6">
            <AnimatedText
              text={`Hi, I'm ${config.author.name} 👋`}
              as="h1"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-brand text-primary leading-tight"
              delay={0.1}
            />

            <AnimatedText
              text={config.author.bio || "Welcome to my digital space"}
              as="p"
              className="text-base md:text-lg lg:text-xl text-secondary leading-relaxed"
              delay={0.3}
            />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className="pt-2 md:pt-4"
            >
              <Link href={config.social?.x || "#"}>
                <Button
                  variant="default"
                  size="lg"
                  className="text-sm md:text-base transition-all hover:scale-105"
                >
                  Follow me on 𝕏
                </Button>
              </Link>
            </motion.div>

            {/* Social Cards with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className="pt-4"
            >
              <SocialCards />
            </motion.div>
          </div>

          {/* Right Column - 3D Office Scene */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="aspect-square lg:h-[400px] xl:h-[450px] rounded-3xl bg-gradient-to-br from-primary/5 via-background to-accent/5 border-2 border-primary/15 overflow-hidden relative">
              {/* 3D Office Scene */}
              {mounted && (
                <div className="w-full h-full">
                  <OfficeScene3D />
                </div>
              )}

              {/* Fallback loading state */}
              {!mounted && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse" />
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
