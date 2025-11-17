"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);

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
      {/* Desktop: Stacked cards */}
      <div
        className="social-list relative hidden md:flex items-center justify-start h-[72px]"
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => {
          setIsContainerHovered(false);
          setHoveredIndex(null);
        }}
      >
        {socialData.map((item: SocialItem, index: number) => {
          const isHovered = hoveredIndex === index;
          const baseOffset = index * 3;
          const expandedOffset = index * 85;
          const baseRotation = index * 5;

          // Calculate transition properties separately
          const transitionDuration = isHovered ? '0.35s' : '0.6s';
          const transitionTimingFunction = isHovered
            ? 'cubic-bezier(0.34, 1.5, 0.64, 1)'
            : 'cubic-bezier(0.34, 1.2, 0.64, 1)';
          const transitionDelay = isContainerHovered && !isHovered ? `${index * 0.03}s` : '0s';

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item absolute left-0 w-[72px] h-[72px] rounded-xl overflow-hidden cursor-pointer border-2 border-primary/15 dark:border-primary/25 shadow-md hover:shadow-xl"
              style={{
                transform: isHovered
                  ? `translateX(${expandedOffset - 5}px) translateY(-10px) rotate(-6deg) scale(1.05)`
                  : isContainerHovered
                  ? `translateX(${expandedOffset}px) rotate(0deg)`
                  : `translateX(${baseOffset}px) rotate(${baseRotation}deg)`,
                zIndex: isHovered ? 9999 : isContainerHovered ? 100 + index : socialData.length - index,
                transitionProperty: 'transform, z-index, box-shadow',
                transitionDuration: `${transitionDuration}, 0s, 0.3s`,
                transitionTimingFunction: `${transitionTimingFunction}, linear, ease`,
                transitionDelay: `${transitionDelay}, ${isContainerHovered ? '0s' : '0.6s'}, 0s`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  style={{
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    transitionProperty: 'transform',
                    transitionDuration: '0.4s',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  sizes="72px"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transitionProperty: 'opacity',
                    transitionDuration: '0.3s',
                  }}
                />
                {/* Username */}
                <div
                  className="absolute bottom-1.5 left-1.5 z-10"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transitionProperty: 'opacity',
                    transitionDuration: '0.3s',
                  }}
                >
                  <span className="text-[8px] text-white font-medium drop-shadow-lg">
                    @{item.username}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Mobile: Simple grid */}
      <div className="md:hidden flex flex-wrap gap-2 justify-center">
        {socialData.map((item: SocialItem) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-[72px] h-[72px] rounded-xl overflow-hidden cursor-pointer border-2 border-primary/15 dark:border-primary/25 active:scale-95 transition-transform"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="72px"
              unoptimized
            />
          </a>
        ))}
      </div>
    </div>
  );
}
