"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { SocialCards } from "@/components/social-cards";
import { config } from "@/lib/config";

export function HeroSection() {
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

          {/* Right Column - Featured Image/Card */}
          <div className="relative hidden lg:block">
            <div className="aspect-square lg:h-[350px] xl:h-[400px] rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-2 border-primary/20 p-6 md:p-8 flex items-center justify-center">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl font-brand text-primary" suppressHydrationWarning>
                    {config.author.name.slice(0, 1).toUpperCase()}
                  </span>
                </div>
                <p className="text-lg md:text-xl font-brand text-primary">
                  {config.site.title}
                </p>
                <p className="text-xs md:text-sm text-secondary max-w-xs mx-auto">
                  Building the future, one line of code at a time
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-accent/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
