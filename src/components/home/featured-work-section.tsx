"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";

interface Project {
  name: string;
  description: string;
  tags?: string[];
  image: string;
  url: string;
  isShow?: boolean;
  featured?: boolean;
}

interface FeaturedWorkSectionProps {
  title?: string;
  description?: string;
  limit?: number;
}

export function FeaturedWorkSection({
  title = "Featured Work ↓",
  description = "Building innovative solutions with modern technologies. From AI-powered tools to enterprise systems.",
  limit,
}: FeaturedWorkSectionProps) {
  // Filter projects
  let visibleProjects = projectsData.filter(
    (project: Project) => project.isShow !== false
  );

  // Apply limit if specified
  if (limit) {
    visibleProjects = visibleProjects.slice(0, limit);
  }

  // Split into featured (first 1-2) and grid projects (rest)
  const featuredProjects = visibleProjects
    .filter((p) => p.featured)
    .slice(0, 1);

  // Get names of featured projects for comparison
  const featuredNames = new Set(featuredProjects.map((p) => p.name));
  const gridProjects = visibleProjects.filter(
    (p) => !p.featured || !featuredNames.has(p.name)
  );

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container-anthropic">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 md:mb-12 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-brand text-primary">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-muted max-w-3xl">
              {description}
            </p>
          )}
        </motion.div>

        {/* Featured Projects - Full Width */}
        {featuredProjects.length > 0 && (
          <div className="space-y-8 md:space-y-10 mb-8 md:mb-10">
            {featuredProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tags={project.tags}
                image={project.image}
                url={project.url}
                layout="featured"
                index={index}
              />
            ))}
          </div>
        )}

        {/* Grid Projects - Two Columns */}
        {gridProjects.length > 0 && (
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {gridProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tags={project.tags}
                image={project.image}
                url={project.url}
                layout="grid"
                index={featuredProjects.length + index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
