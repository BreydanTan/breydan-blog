"use client";

import { motion } from "framer-motion";
import { Code2, BookOpen, Rocket, Wrench } from "lucide-react";
import Link from "next/link";

const exploreItems = [
  {
    id: 1,
    title: "Design & Code",
    description: "Turning ideas into beautiful, functional experiences.",
    icon: Code2,
    gradient: "from-blue-500/10 via-blue-400/5 to-primary/10",
    delay: 0.5,
  },
  {
    id: 2,
    title: "Writing",
    description: "Style guides, design notes, and quick reads.",
    icon: BookOpen,
    gradient: "from-purple-500/10 via-pink-400/5 to-pink-500/10",
    delay: 0.6,
    link: "/blog",
  },
  {
    id: 3,
    title: "Projects",
    description: "Innovative solutions and experiments with AI.",
    icon: Rocket,
    gradient: "from-orange-500/10 via-red-400/5 to-red-500/10",
    delay: 0.7,
  },
  {
    id: 4,
    title: "My Tools",
    description: "Technologies I use to build modern applications.",
    icon: Wrench,
    gradient: "from-green-500/10 via-emerald-400/5 to-emerald-500/10",
    delay: 0.8,
  },
];

export function ExploreSection() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container-anthropic">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brand text-primary mb-2">
            Explore ↓
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {exploreItems.map((item) => {
            const Icon = item.icon;

            const cardContent = (
              <div
                className="
                  group relative h-[200px] md:h-[240px] lg:h-[264px] rounded-xl
                  border border-primary/15 dark:border-neutral-700/50
                  bg-white/75 dark:bg-bg-secondary-dark
                  backdrop-blur-sm overflow-hidden cursor-pointer
                  transition-all duration-500
                  hover:border-primary/30 dark:hover:border-primary/40
                "
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-100`} />

                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-between z-10">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl lg:text-[28px] font-brand text-primary leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-[13px] lg:text-sm text-muted leading-snug max-w-[90%] md:max-w-[85%]">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon with animation */}
                  <div className="flex justify-end items-end">
                    <div
                      className="
                        w-16 h-16 md:w-[72px] md:h-[72px] lg:w-20 lg:h-20 rounded-full
                        bg-primary/10 dark:bg-primary/20
                        flex items-center justify-center
                        transition-all duration-500 ease-out
                        group-hover:scale-110 group-hover:rotate-12
                        group-hover:bg-primary/20 dark:group-hover:bg-primary/30
                        shadow-sm group-hover:shadow-md
                      "
                    >
                      <Icon className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary transition-all duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                </div>

                {/* Hover gradient overlay - subtle shine effect */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-primary/5 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    z-5
                  "
                />

                {/* Decorative corner accent */}
                <div
                  className="
                    absolute top-0 right-0 w-20 h-20
                    bg-gradient-to-br from-primary/5 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    rounded-bl-3xl
                  "
                />
              </div>
            );

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: item.delay,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {item.link ? (
                  <Link href={item.link} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
