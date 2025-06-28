export const config = {
  site: {
    title: "Breydan Personal Blog",
    name: "Breydan tan",
    description: "This is a personal blog for Breydan tan",
    keywords: ["SAAS", "AI", "Full Stack Developer"],
    url: "https://blog.breydan.com",
    baseUrl: "https://breydan.com",
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
    bio: "Support Engineer at One Empower ptd ltd. Self-learning Front-end development and sharing my journey through this blog.",
  },
  social: {
    github: "https://github.com/BraydenTan",
    x: "https://x.com/BreydanT94338",
    linkedin: "https://www.linkedin.com/in/breydan/",
  },
  giscus: {
    repo: "BraydenTan/nextjs-blog-template",
    repoId: "YOUR_REPO_ID",
    categoryId: "YOUR_CATEGORY_ID",
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
