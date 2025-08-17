import { config } from "@/lib/config";
import DownloadResumeButton from "@/components/DownloadResumeButton";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="container-anthropic py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-20">
          <div className="relative inline-block mb-8">
            <Image
              src="https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/avatar.png"
              alt="Breydan Tan"
              width={160}
              height={160}
              priority
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-lg border-4 border-background"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Breydan Tan
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-3">
            Support Engineer & AI Explorer
          </p>
          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Passionate about technology, AI development, and building meaningful
            solutions
          </p>

          <DownloadResumeButton />
        </section>

        <div className="space-y-16">
          {/* About Me Section */}
          <section className="bg-subtle p-8 md:p-10 rounded-lg border border-border">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              About Me
            </h2>
            <div className="space-y-6 text-secondary leading-relaxed">
              <p className="text-lg">
                Hi there! I'm Breydan, a dedicated developer with an insatiable
                curiosity for technology and innovation. While working as a
                Support Engineer at One Empower Pte Ltd, I've been actively
                building full-stack applications and exploring cutting-edge AI
                development tools to enhance my development workflow.
              </p>
              <p>
                What drives me is the endless possibilities that technology
                offers. I love exploring new frameworks, solving challenging
                problems, and turning ideas into reality through code. From
                developing AI-powered book summary platforms to creating
                interactive learning roadmaps, I'm constantly pushing myself to
                learn and build meaningful products.
              </p>
              <p>
                This blog serves as both my development portfolio and a resource
                for fellow developers. I believe in the power of sharing
                knowledge and hope my experiences building real-world
                applications can inspire and help others on their own tech
                journeys.
              </p>
            </div>
          </section>

          {/* Professional Experience */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              Professional Experience
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Support Engineer
                  </h3>
                  <p className="text-link font-medium text-lg">
                    One Empower Pte Ltd
                  </p>
                </div>
                <span className="text-muted text-sm mt-2 md:mt-0 bg-subtle px-3 py-1 rounded-full">
                  Present
                </span>
              </div>
              <ul className="space-y-3 text-secondary">
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  Provide technical support and troubleshooting for enterprise
                  clients
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  Collaborate with development teams to resolve complex
                  technical issues
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  Document solutions and maintain knowledge base for common
                  problems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  Continuously learning new technologies to better support
                  evolving systems
                </li>
              </ul>
            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Frontend Development
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "HTML5",
                    "CSS3",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Cloud & Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cloudflare Workers",
                    "AWS S3",
                    "Cloudflare Pages",
                    "Vercel",
                    "GitHub Actions",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Backend & Database
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "MongoDB",
                    "PostgreSQL",
                    "Prisma",
                    "NextAuth.js",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Currently Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "DevOps",
                    "System Architecture",
                    "Performance Optimization",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Learning Philosophy */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              Learning Philosophy
            </h2>
            <div className="bg-subtle p-8 rounded-lg border border-border mb-8">
              <blockquote className="border-l-4 border-primary pl-6 italic text-secondary text-lg md:text-xl">
                "Learning never exhausts the mind. Every challenge is an
                opportunity to grow, and every project is a chance to discover
                something new."
              </blockquote>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="font-semibold mb-3 text-primary">
                  Goal-Oriented
                </h4>
                <p className="text-sm text-secondary">
                  Setting clear objectives and working systematically towards
                  them
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <div className="text-3xl mb-4">🤝</div>
                <h4 className="font-semibold mb-3 text-primary">
                  Collaborative
                </h4>
                <p className="text-sm text-secondary">
                  Learning from others and sharing knowledge with the community
                </p>
              </div>
              <div className="text-center p-6 bg-card border border-border rounded-lg">
                <div className="text-3xl mb-4">🔄</div>
                <h4 className="font-semibold mb-3 text-primary">Iterative</h4>
                <p className="text-sm text-secondary">
                  Continuously improving through feedback and practice
                </p>
              </div>
            </div>
          </section>

          {/* AI Development Stack */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              AI Development Stack Exploration
            </h2>
            <div className="bg-subtle p-8 rounded-lg border border-border mb-6">
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-3">🤖</div>
                <h3 className="text-lg font-semibold text-primary">
                  Embracing AI-Powered Development
                </h3>
              </div>
              <p className="text-secondary leading-relaxed mb-6">
                I'm actively exploring and integrating AI tools into my
                development workflow to enhance productivity and learn modern
                development practices. These tools are revolutionizing how we
                write, debug, and optimize code.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">Cursor</h4>
                  <p className="text-sm text-secondary">
                    AI-powered code editor for intelligent code completion and
                    refactoring
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">
                    Claude Code
                  </h4>
                  <p className="text-sm text-secondary">
                    Advanced AI assistant for complex development tasks and
                    architecture decisions
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-primary mb-2">
                    Gemini CLI
                  </h4>
                  <p className="text-sm text-secondary">
                    Command-line AI integration for automated development
                    workflows
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Current Projects */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              Current Development Projects
            </h2>
            <div className="space-y-8">
              {/* ReadSmart Today Project */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      ReadSmart Today
                    </h3>
                    <p className="text-link font-medium mb-2">
                      AI-Powered Book Summary Platform
                    </p>
                    <a
                      href="https://www.readsmart.today"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:text-link-hover text-sm underline transition-anthropic"
                    >
                      🌐 readsmart.today
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs">
                      Next.js 14
                    </span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs">
                      MongoDB
                    </span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs">
                      Gemini AI
                    </span>
                  </div>
                </div>

                <p className="text-secondary mb-6 leading-relaxed">
                  A comprehensive platform that transforms PDF books into
                  AI-generated summaries with interactive features. Users can
                  upload PDFs, get instant AI-powered summaries, and access key
                  takeaways with mind maps.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Key Features
                    </h4>
                    <ul className="text-sm text-secondary space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        PDF upload and text extraction
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        AI-powered summary generation
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Interactive book management
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Admin dashboard with analytics
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Architecture Highlights
                    </h4>
                    <ul className="text-sm text-secondary space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Server-side rendering with Next.js App Router
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        MongoDB with Mongoose ODM
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        AWS S3 for file storage
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Google Gemini API integration
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js 14",
                    "TypeScript",
                    "MongoDB",
                    "AWS S3",
                    "Google Gemini",
                    "Tailwind CSS",
                    "DaisyUI",
                    "PDF.js",
                    "NextAuth.js",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-secondary rounded-full text-xs font-medium border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* SAAS Roadmap Project */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      SAAS Roadmap Platform
                    </h3>
                    <p className="text-link font-medium mb-2">
                      Interactive Learning Path Creator
                    </p>
                    <span className="text-sm text-muted bg-subtle px-3 py-1 rounded-full border border-border">
                      In Development
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs">
                      Next.js 15
                    </span>
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full text-xs">
                      PostgreSQL
                    </span>
                    <span className="px-2 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-xs">
                      Cloudflare
                    </span>
                  </div>
                </div>

                <p className="text-secondary mb-6 leading-relaxed">
                  A sophisticated platform for creating and sharing interactive
                  learning roadmaps. Users can design visual learning paths,
                  track progress, and share knowledge with the community through
                  an intuitive node-based interface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Core Features
                    </h4>
                    <ul className="text-sm text-secondary space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Visual roadmap creator with React Flow
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Progress tracking and analytics
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Multi-user collaboration
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Resource management system
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-3">
                      Technical Innovation
                    </h4>
                    <ul className="text-sm text-secondary space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Edge-first architecture with Cloudflare
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Type-safe API with Zod validation
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Real-time collaboration features
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        Performance-optimized with caching
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js 15",
                    "TypeScript",
                    "PostgreSQL",
                    "Prisma",
                    "Cloudflare Pages",
                    "React Flow",
                    "Shadcn/ui",
                    "NextAuth.js",
                    "Zod",
                    "Neon DB",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-secondary rounded-full text-xs font-medium border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-subtle p-8 rounded-lg border border-border">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              Get in Touch
            </h2>
            <p className="text-secondary mb-6 leading-relaxed">
              Feel free to reach out to me at{" "}
              <a
                href={`mailto:${config.author.email}`}
                className="text-link hover:text-link-hover underline transition-anthropic"
              >
                {config.author.email}
              </a>
            </p>

            {config.social && (
              <div className="flex flex-wrap gap-4">
                {config.social.github && (
                  <a
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-anthropic"
                  >
                    GitHub
                  </a>
                )}
                {config.social.x && (
                  <a
                    href={config.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-anthropic"
                  >
                    Twitter
                  </a>
                )}
                {config.social.linkedin && (
                  <a
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-anthropic"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </section>

          <div className="text-center pt-8 border-t border-border">
            <p className="text-muted text-sm">
              Copyright (c) Breydan Tan - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: `About Me - ${config.site.title}`,
  description: `Learn more about ${config.author.name}`,
};
