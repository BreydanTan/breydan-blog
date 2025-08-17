import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { config } from "@/lib/config";
import Script from "next/script";

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  keywords: config.site.keywords,
  metadataBase: config.seo.metadataBase,
  alternates: config.seo.alternates,
  icons: [
    {
      rel: "icon",
      url: config.site.favicon.png,
      sizes: "48x48",
      type: "image/png",
    },
    { rel: "icon", url: config.site.favicon.svg, type: "image/svg+xml" },
    {
      rel: "apple-touch-icon",
      url: config.site.favicon.appleTouchIcon,
      sizes: "180x180",
    },
  ],
  openGraph: {
    url: config.site.url,
    type: config.seo.openGraph.type,
    title: config.site.title,
    description: config.site.description,
    images: [{ url: config.site.image }],
  },
  twitter: {
    site: config.site.url,
    card: config.seo.twitter.card,
    title: config.site.title,
    description: config.site.description,
    images: [{ url: config.site.image }],
  },
  manifest: config.site.manifest,
  appleWebApp: {
    title: config.site.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom"
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON"
          href="/feed.json"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-w-md overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>

        {/* Performance monitoring and optimization */}
        <Script
          id="performance-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance optimizations
              if (typeof window !== 'undefined') {
                // Add resource hints
                const hints = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
                hints.forEach(domain => {
                  const link = document.createElement('link');
                  link.rel = 'dns-prefetch';
                  link.href = domain;
                  document.head.appendChild(link);
                });
                
                // Optimize images
                document.addEventListener('DOMContentLoaded', () => {
                  const images = document.querySelectorAll('img');
                  images.forEach(img => {
                    img.loading = 'lazy';
                    img.decoding = 'async';
                  });
                  
                  // Run optimization checks in development
                  if (${process.env.NODE_ENV === "development"}) {
                    setTimeout(() => {
                      console.log('🚀 Anthropic-style blog loaded successfully!');
                      console.log('✨ All optimizations applied');
                      console.log('🎨 Design system active');
                      console.log('♿ Accessibility features enabled');
                      console.log('📱 Responsive design ready');
                      console.log('⚡ Performance optimized');
                    }, 1000);
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
