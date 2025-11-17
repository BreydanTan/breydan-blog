export const config = {
  site: {
    title: "Breydan Personal Blog",
    name: "Breydan Tan",
    description: "AI-powered full-stack developer sharing insights on modern SaaS development, Next.js, and AI integration. From enterprise systems to indie hacking.",
    keywords: ["AI Development", "Next.js", "SaaS", "Full Stack", "Enterprise", "Indie Developer", "ReadSmart Today"],
    url: "https://blog.breydan.com",
    baseUrl: "https://blog.breydan.com",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHccINn9TI4Kg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1716282280243?e=1756339200&v=beta&t=KbxNTy4l_8Q5NdEGBXY39cpofDZagj_M-GKeWkShC78",
    favicon: {
      ico: "/favicon.ico",
      png: "/favicon.png",
      svg: "/favicon.svg",
      appleTouchIcon: "/favicon.png",
    },
    manifest: "/site.webmanifest",
    rss: {
      title: "Nextjs Blog Template",
      description: "Thoughts on Full-stack development, AI",
      feedLinks: {
        rss2: "/rss.xml",
        json: "/feed.json",
        atom: "/atom.xml",
      },
    },
  },
  author: {
    name: "Breydan Tan",
    email: "breydantech@gmail.com",
    bio: "Product designer and full-stack developer. Building AI-powered SaaS products.",
  },
  social: {
    github: "https://github.com/BreydanTan",
    x: "https://x.com/BreydanT94338",
    linkedin: "https://www.linkedin.com/in/breydan/",
  },
  giscus: {
    repo: "BreydanTan/breydan-blog",
    repoId: "R_kgDOPDW2Fw",
    categoryId: "DIC_kwDOPDW2F84CsJ8v",
  },
  navigation: {
    main: [
      { 
        title: "Blog", 
        href: "/blog",
      },
      { 
        title: "About Me", 
        href: "/about",
      },
    ],
  },
  seo: {
    metadataBase: new URL("https://blog.breydan.com"),
    alternates: {
      canonical: './',
    },
    openGraph: {
      type: "website" as const,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      creator: "@Twitter",
    },
  },
};
