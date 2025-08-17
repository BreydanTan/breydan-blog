"use client";

import { useState, useEffect } from "react";
import Giscus from "@giscus/react";
import { config } from "@/lib/config";

export default function GiscusComments() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if Giscus is properly configured
  const isGiscusConfigured =
    config.giscus.repoId !== "YOUR_REPO_ID" &&
    config.giscus.categoryId !== "YOUR_CATEGORY_ID";

  // Don't render Giscus until component is mounted on client side
  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-muted">Loading comments...</div>
      </div>
    );
  }

  // If Giscus is not configured, show a placeholder
  if (!isGiscusConfigured) {
    return (
      <div className="bg-subtle border border-border rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-primary mb-2">Comments</h3>
        <p className="text-secondary text-sm">
          Comments will be available once Giscus is configured for this
          repository.
        </p>
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
