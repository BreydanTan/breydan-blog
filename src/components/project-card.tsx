"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  tags?: string[];
  image: string;
  url: string;
  layout?: "featured" | "grid";
  index?: number;
}

export function ProjectCard({
  name,
  description,
  tags = [],
  image,
  url,
  layout = "grid",
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-primary/15 dark:border-neutral-700/50",
        "bg-white/85 dark:bg-bg-secondary-dark backdrop-blur-sm",
        "transition-all duration-500",
        "hover:shadow-xl hover:shadow-primary/10",
        "hover:border-primary/30 dark:hover:border-primary/40",
        layout === "featured" ? "mb-8" : ""
      )}
    >
      {/* Image/Video Container */}
      <div className="relative aspect-video overflow-hidden">
        <div className="relative w-full h-full bg-gradient-to-br from-primary/10 to-primary/5">
          {image.includes("placeholder") ? (
            // Placeholder gradient
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl md:text-7xl font-brand text-primary/40">
                {name.charAt(0)}
              </span>
            </div>
          ) : (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={
                layout === "featured"
                  ? "(max-width: 768px) 100vw, 80vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />
          )}
        </div>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Link Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-lg transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 group-hover:scale-110">
            <ExternalLink className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-6">
        {/* Title and Link Icon */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className={cn(
              "text-neutral-900 dark:text-white leading-tight font-brand",
              "transition-colors duration-300",
              "group-hover:text-primary dark:group-hover:text-primary",
              layout === "featured" ? "text-2xl md:text-3xl" : "text-2xl"
            )}
          >
            {name}
          </h3>

          {/* Link Icon Badge */}
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:text-neutral-900 group-hover:rotate-45">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/8 dark:bg-primary/15 px-2.5 py-0.5 text-[10px] font-medium text-primary border border-primary/10 dark:border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-muted leading-relaxed",
              layout === "featured"
                ? "text-base md:text-lg line-clamp-2"
                : "text-sm line-clamp-2"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Link Overlay */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View {name}</span>
      </a>
    </motion.article>
  );
}
