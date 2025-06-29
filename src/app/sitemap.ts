import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
  {
    "url": "/",
    lastModified: new Date("2025-06-29T16:34:15.866Z"),
    "changeFrequency": "daily",
    "priority": 1
  },
  {
    "url": "/blog",
    lastModified: new Date("2025-06-29T16:34:15.866Z"),
    "changeFrequency": "daily",
    "priority": 0.9
  },
  {
    "url": "blog/claude-code-nextjs-cloudflare-s3",
    lastModified: new Date("2025-06-29T02:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "blog/deploy_worker",
    lastModified: new Date("2025-06-29T16:34:15.864Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "blog/geminiCLI",
    lastModified: new Date("2025-06-28T02:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "blog/hello-world",
    lastModified: new Date("2025-04-05T12:10:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "blog/intro",
    lastModified: new Date("2025-06-29T02:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  },
  {
    "url": "blog/saas_techstack",
    lastModified: new Date("2025-06-28T02:00:00.000Z"),
    "changeFrequency": "weekly",
    "priority": 0.8
  }
]
}
