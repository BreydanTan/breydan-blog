import { config } from "@/lib/config";
import DownloadResumeButton from "@/components/DownloadResumeButton";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="prose prose-lg mx-auto max-w-none">
        <div className="text-center mb-8 sm:mb-12">
          <Image
            src="https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/avatar.png"
            alt="Breydan Tan"
            width={128}
            height={128}
            priority
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 shadow-lg"
          />
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Breydan Tan</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 px-4">Support Engineer & Vibe Coder</p>
          <p className="text-gray-500 mb-6 px-4">Passionate learner exploring new technologies</p>
          
          <DownloadResumeButton />
        </div>
        
        <div className="space-y-8 sm:space-y-12">
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 rounded-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">About Me</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p className="text-base sm:text-lg">
                Hi there! I'm Breydan, a dedicated developer with an insatiable curiosity for technology and innovation. 
                While working as a Support Engineer at One Empower Pte Ltd, I've been actively building full-stack 
                applications and exploring cutting-edge AI development tools to enhance my development workflow.
              </p>
              <p>
                What drives me is the endless possibilities that technology offers. I love exploring new frameworks, 
                solving challenging problems, and turning ideas into reality through code. From developing AI-powered 
                book summary platforms to creating interactive learning roadmaps, I'm constantly pushing myself to 
                learn and build meaningful products.
              </p>
              <p>
                This blog serves as both my development portfolio and a resource for fellow developers. I believe in the 
                power of sharing knowledge and hope my experiences building real-world applications can inspire and help 
                others on their own tech journeys.
              </p>
            </div>
          </section>

          <section className="no-page-break">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Professional Experience</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Support Engineer</h3>
                  <p className="text-blue-600 font-medium">One Empower Pte Ltd</p>
                </div>
                <span className="text-gray-500 text-sm mt-1 sm:mt-0">Present</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                <li>Provide technical support and troubleshooting for enterprise clients</li>
                <li>Collaborate with development teams to resolve complex technical issues</li>
                <li>Document solutions and maintain knowledge base for common problems</li>
                <li>Continuously learning new technologies to better support evolving systems</li>
              </ul>
            </div>
          </section>

          <section className="no-page-break">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Frontend Development</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Cloud & Infrastructure</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['Cloudflare Workers', 'AWS S3', 'Cloudflare Pages', 'Vercel', 'GitHub Actions'].map(skill => (
                    <span key={skill} className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Backend & Database</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['Node.js', 'MongoDB', 'PostgreSQL', 'Prisma', 'NextAuth.js'].map(skill => (
                    <span key={skill} className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Currently Learning</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['Python', 'DevOps', 'System Architecture', 'Performance Optimization'].map(skill => (
                    <span key={skill} className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs sm:text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Learning Philosophy</h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
              <blockquote className="border-l-4 border-green-500 pl-6 italic text-gray-700 text-lg">
                "Learning never exhausts the mind. Every challenge is an opportunity to grow, 
                and every project is a chance to discover something new."
              </blockquote>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2">Goal-Oriented</h4>
                <p className="text-sm text-gray-600">Setting clear objectives and working systematically towards them</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold mb-2">Collaborative</h4>
                <p className="text-sm text-gray-600">Learning from others and sharing knowledge with the community</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold mb-2">Iterative</h4>
                <p className="text-sm text-gray-600">Continuously improving through feedback and practice</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">AI Development Stack Exploration</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg mb-6">
              <div className="flex items-center mb-4">
                <div className="text-xl sm:text-2xl mr-2 sm:mr-3">🤖</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Embracing AI-Powered Development</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
                I'm actively exploring and integrating AI tools into my development workflow to enhance productivity 
                and learn modern development practices. These tools are revolutionizing how we write, debug, and 
                optimize code.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Cursor</h4>
                  <p className="text-xs sm:text-sm text-gray-600">AI-powered code editor for intelligent code completion and refactoring</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Claude Code</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Advanced AI assistant for complex development tasks and architecture decisions</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Gemini CLI</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Command-line AI integration for automated development workflows</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Current Development Projects</h2>
            <div className="space-y-4 sm:space-y-6">
              
              {/* ReadSmart Today Project */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">ReadSmart Today</h3>
                    <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">AI-Powered Book Summary Platform</p>
                    <a href="https://www.readsmart.today" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm underline">
                      🌐 readsmart.today
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Next.js 14</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">MongoDB</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Gemini AI</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  A comprehensive platform that transforms PDF books into AI-generated summaries with interactive features. 
                  Users can upload PDFs, get instant AI-powered summaries, and access key takeaways with mind maps.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Key Features</h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• PDF upload and text extraction</li>
                      <li>• AI-powered summary generation</li>
                      <li>• Interactive book management</li>
                      <li>• Admin dashboard with analytics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Architecture Highlights</h4>
                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <li>• Server-side rendering with Next.js App Router</li>
                      <li>• MongoDB with Mongoose ODM</li>
                      <li>• AWS S3 for file storage</li>
                      <li>• Google Gemini API integration</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['Next.js 14', 'TypeScript', 'MongoDB', 'AWS S3', 'Google Gemini', 'Tailwind CSS', 'DaisyUI', 'PDF.js', 'NextAuth.js'].map(tech => (
                    <span key={tech} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* SAAS Roadmap Project */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">SAAS Roadmap Platform</h3>
                    <p className="text-green-600 font-medium mb-2">Interactive Learning Path Creator</p>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">In Development</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Next.js 15</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">PostgreSQL</span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Cloudflare</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  A sophisticated platform for creating and sharing interactive learning roadmaps. Users can design 
                  visual learning paths, track progress, and share knowledge with the community through an intuitive 
                  node-based interface.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Core Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Visual roadmap creator with React Flow</li>
                      <li>• Progress tracking and analytics</li>
                      <li>• Multi-user collaboration</li>
                      <li>• Resource management system</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Technical Innovation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Edge-first architecture with Cloudflare</li>
                      <li>• Type-safe API with Zod validation</li>
                      <li>• Real-time collaboration features</li>
                      <li>• Performance-optimized with caching</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'Cloudflare Pages', 'React Flow', 'Shadcn/ui', 'NextAuth.js', 'Zod', 'Neon DB'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Enterprise Experience</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Enterprise Java Application Support</h3>
                  <p className="text-blue-600 font-medium">Loyalty Banking System</p>
                </div>
                <span className="text-gray-500 text-sm">Current Role</span>
              </div>
              
              <p className="text-gray-700 mb-4">
                Supporting a large-scale enterprise banking application with modular architecture. Gaining hands-on 
                experience with enterprise-grade systems, CI/CD pipelines, and modern DevOps practices.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">System Architecture</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Modular Java application with Spring Framework</li>
                    <li>• API Gateway pattern implementation</li>
                    <li>• Microservices-oriented design</li>
                    <li>• Multi-region deployment </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">DevOps & Infrastructure</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Jenkins CI/CD pipelines</li>
                    <li>• Kubernetes deployment with Helm charts</li>
                    <li>• Docker containerization</li>
                    <li>• Database migration with Flyway</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Technology Stack Experience</h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Framework', 'Oracle Database', 'Jenkins', 'Kubernetes', 'Docker', 'Helm', 'Maven', 'Flyway'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Learning Goals & Future Plans</h2>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">🎯 Short-term Goals</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Complete ReadSmart Today platform with advanced features</li>
                    <li>• Launch SAAS Roadmap with user collaboration</li>
                    <li>• Master advanced React patterns and performance optimization</li>
                    <li>• Deepen understanding of cloud architecture</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">🚀 Long-term Vision</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Transition to full-time full-stack development role</li>
                    <li>• Build and scale multiple SaaS products</li>
                    <li>• Contribute to open-source projects</li>
                    <li>• Mentor others in their tech journey</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Blog Tech Stack & Deployment</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                This blog showcases modern deployment practices using{" "}
                <a href="https://pages.cloudflare.com/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  Cloudflare Pages
                </a>
                {" "}for hosting and{" "}
                <a href="https://aws.amazon.com/s3/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  AWS S3
                </a>
                {" "}for optimized image storage. Built with{" "}
                <a href="https://nextjs.org/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  Next.js 15
                </a>
                {" "}using static export and{" "}
                <a href="https://tailwindcss.com/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                  Tailwind CSS
                </a>
                {" "}for styling. Achieved 95+ Lighthouse scores across all metrics.
              </p>
              
              <div className="my-6">
                <img 
                  src="https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/score.jpg" 
                  alt="Lighthouse Performance Score" 
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'MDX', 'Cloudflare Pages', 'AWS S3', 'Claude Code'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p className="text-gray-600">
              Feel free to reach out to me at{" "}
              <a 
                href={`mailto:${config.author.email}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {config.author.email}
              </a>
            </p>
            
            {config.social && (
              <div className="flex flex-wrap gap-4 mt-6">
                {config.social.github && (
                  <a
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {config.social.x && (
                  <a
                    href={config.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {config.social.linkedin && (
                  <a
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
          
          <hr className="border-gray-300" />
          <p className="text-center text-gray-500 text-sm">
            Copyright (c) Breydan Tan - All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: `About Me - ${config.site.title}`,
  description: `Learn more about ${config.author.name}`,
};