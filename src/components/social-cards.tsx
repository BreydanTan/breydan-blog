"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import socialData from "@/data/social.json";

interface SocialItem {
  id: number;
  name: string;
  username: string;
  image: string;
  url: string;
}

export function SocialCards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[72px]">
        <div className="flex gap-2">
          {socialData.map((item) => (
            <div
              key={item.id}
              className="w-[72px] h-[72px] rounded-xl bg-primary/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="social-cards-wrapper relative w-full">
      <div className="social-list relative flex items-center justify-start h-[72px] md:h-[72px]">
        {socialData.map((item: SocialItem, index: number) => (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-item absolute left-0 w-[72px] h-[72px] rounded-xl overflow-hidden cursor-pointer border-2 border-primary/10 dark:border-primary/20 hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300"
            style={{
              "--index": index,
              "--total": socialData.length,
            } as React.CSSProperties}
            initial={{
              x: index * 3,
              rotate: index * 5,
              zIndex: socialData.length - index,
            }}
            whileHover={{
              y: -10,
              rotate: -6,
              scale: 1.05,
              zIndex: 9999,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            animate={{
              x: index * 3,
              rotate: index * 5,
              zIndex: socialData.length - index,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              delay: index * 0.03,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-400 hover:scale-115"
                sizes="72px"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-1.5 left-1.5 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] text-white font-medium drop-shadow-lg">
                  @{item.username}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <style jsx global>{`
        @media (min-width: 769px) {
          .social-list:hover .social-item {
            animation: expandCards 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
          }
        }

        @keyframes expandCards {
          to {
            transform: translateX(calc(var(--index) * 85px)) rotate(0deg);
          }
        }

        .social-item:hover .social-image {
          transform: scale(1.15);
        }

        @media (max-width: 768px) {
          .social-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            height: auto;
            justify-content: center;
          }

          .social-item {
            position: relative !important;
            transform: none !important;
          }

          .social-item:active {
            transform: scale(0.95) !important;
          }
        }
      `}</style>
    </div>
  );
}
