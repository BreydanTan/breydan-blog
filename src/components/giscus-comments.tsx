"use client"

import { useState, useEffect } from 'react';
import Giscus from '@giscus/react';
import { config } from '@/lib/config';

export default function GiscusComments() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render Giscus until component is mounted on client side
  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading comments...</div>
      </div>
    );
  }

  return (
    <Giscus
      id="comments"
      repo={config.giscus.repo as `${string}/${string}`}
      repoId={config.giscus.repoId}
      category="Announcements"
      categoryId={config.giscus.categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
