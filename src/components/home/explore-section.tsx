"use client";

import { motion } from "framer-motion";
import { Code2, BookOpen, Rocket, Wrench } from "lucide-react";
import Link from "next/link";

const exploreItems = [
  {
    id: 1,
    title: "Design & Code",
    description: "Building beautiful, functional web experiences with modern tech.",
    icon: Code2,
    gradient: "from-blue-500/10 to-primary/10",
    delay: 0.5,
  },
  {
    id: 2,
    title: "Writing",
    description: "Thoughts on AI, development, and technology trends.",
    icon: BookOpen,
    gradient: "from-purple-500/10 to-pink-500/10",
    delay: 0.6,
    link: "/blog",
  },
  {
    id: 3,
    title: "Projects",
    description: "Innovative solutions and experiments with AI and automation.",
    icon: Rocket,
    gradient: "from-orange-500/10 to-red-500/10",
    delay: 0.7,
  },
  {
    id: 4,
    title: "Tools & Tech",
    description: "Technologies and frameworks I use to build modern applications.",
    icon: Wrench,
    gradient: "from-green-500/10 to-emerald-500/10",
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
                className={`
                  group relative h-[200px] md:h-[240px] rounded-xl
                  border border-primary/15 dark:border-neutral-700/50
                  bg-gradient-to-br ${item.gradient}
                  backdrop-blur-sm overflow-hidden cursor-pointer
                  transition-all duration-500
                  hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10
                  hover:border-primary/30 dark:hover:border-primary/40
                `}
              >
                {/* Content */}
                <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-brand text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted max-w-[85%]">
                      {item.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-end">
                    <div
                      className="
                        w-16 h-16 md:w-20 md:h-20 rounded-full
                        bg-primary/10 dark:bg-primary/20
                        flex items-center justify-center
                        transition-all duration-500
                        group-hover:scale-110 group-hover:rotate-12
                        group-hover:bg-primary/20 dark:group-hover:bg-primary/30
                      "
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-primary/5 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
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
                  <Link href={item.link}>{cardContent}</Link>
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
