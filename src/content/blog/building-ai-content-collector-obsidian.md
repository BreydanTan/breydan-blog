# Building an AI-Powered Content Collection System for Obsidian with Claude Code

**How I automated my second brain with RSS feeds, web scraping, and AI translation**

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Prerequisites](#prerequisites)
4. [Project Setup](#project-setup)
5. [Building the RSS Collector](#building-the-rss-collector)
6. [Web Scraping with Crawl4AI](#web-scraping-with-crawl4ai)
7. [AI Translation Service](#ai-translation-service)
8. [Automating with Cron Jobs](#automating-with-cron-jobs)
9. [Troubleshooting](#troubleshooting)
10. [Conclusion](#conclusion)

---

## Introduction

Managing information overload is one of the biggest challenges in the AI era. Every day, hundreds of AI-related articles, research papers, and products are published. How do you stay updated without drowning in content?

In this article, I'll show you how I built an **automated content collection system** that:

- ✅ **Collects** 100+ articles daily from 11 AI-focused sources
- ✅ **Filters** content based on relevance (AI/LLM, AI Agents, AI Products)
- ✅ **Scrapes** full web content with Crawl4AI + Playwright
- ✅ **Translates** English articles to bilingual (EN/ZH) format using AI
- ✅ **Saves** everything to Obsidian as organized Markdown files
- ✅ **Runs** automatically every morning via cron job

All built with **Claude Code** (AI pair programming assistant) in about 2 hours!

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Daily Workflow                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────┐
        │   Step 1: RSS Collection          │
        │   - 11 AI-focused sources         │
        │   - Anthropic, OpenAI, Google AI  │
        │   - Hacker News, Product Hunt     │
        └───────────────┬───────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │   Step 2: Deduplication           │
        │   - Check against index.json      │
        │   - Filter out already collected  │
        └───────────────┬───────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │   Step 3: Web Scraping            │
        │   - Crawl4AI + Playwright         │
        │   - Extract full article content  │
        │   - Convert to Markdown           │
        └───────────────┬───────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │   Step 4: AI Translation          │
        │   - Detect English content        │
        │   - Translate with Gemini API     │
        │   - Generate bilingual format     │
        └───────────────┬───────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │   Step 5: Save to Obsidian        │
        │   - Individual Markdown files     │
        │   - Daily digest/catalog          │
        │   - Organized by date & source    │
        └───────────────────────────────────┘
```

---

## Prerequisites

Before we start, you'll need:

### Software Requirements

- **Python 3.11+** - Programming language
- **Obsidian** - Knowledge management app
- **Claude Code (Web)** - AI coding assistant (optional but recommended)
- **Git** - Version control

### API Keys

- **OpenAI-compatible API** - For AI translation (I used Gemini via OpenRouter)
  - Any OpenAI-compatible endpoint works (OpenAI, Anthropic, local LLMs)

### Python Packages

We'll install these later:
- `feedparser` - RSS parsing
- `requests` - HTTP requests
- `beautifulsoup4` - HTML parsing
- `crawl4ai` - Web scraping
- `playwright` - Browser automation
- `openai` - AI API client
- `pyyaml` - Configuration files

---

## Project Setup

### 1. Initialize Project Structure

Create the following directory structure in your Obsidian vault:

```bash
MyBrain/
├── _automation/
│   ├── collectors/
│   │   ├── __init__.py
│   │   ├── rss_collector.py
│   │   └── web_crawler.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── metadata_manager.py
│   │   ├── article_saver.py
│   │   ├── catalog_generator.py
│   │   └── translation_service.py
│   ├── _meta/
│   │   ├── index.json          # Deduplication index
│   │   └── collection_log.json # Collection history
│   ├── config.yaml
│   ├── requirements.txt
│   └── main_collector.py
└── 🌑 002 ROCKS/
    ├── 📬 Daily Digest/        # Daily summaries
    └── 023 Internet/Auto/      # Raw articles
```

### 2. Set Up Python Environment

```bash
cd MyBrain/_automation

# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On Mac/Linux
# venv\Scripts\activate   # On Windows

# Install dependencies
pip install -r requirements.txt
```

### 3. Create `requirements.txt`

```txt
feedparser==6.0.11
requests==2.31.0
python-dateutil==2.8.2
pyyaml==6.0.1
openai>=1.55.3
beautifulsoup4==4.12.3
markdown==3.5.2
# Pin urllib3 to avoid dependency resolution issues
urllib3==2.2.3
# Web scraping stack
crawl4ai==0.4.24
playwright==1.49.0
aiohttp==3.10.10
```

**Key optimization**: Pinning specific versions (like `urllib3==2.2.3`) reduces pip install time from 10+ minutes to under 2 minutes by avoiding dependency backtracking.

### 4. Install Playwright Browsers

```bash
playwright install chromium
```

This downloads Chromium browser needed for web scraping.

---

## Building the RSS Collector

### Core Concept

RSS feeds provide article metadata (title, URL, summary) but not full content. We'll:
1. Collect from multiple RSS sources
2. Parse article metadata
3. Store in a standardized format

### Implementation: `collectors/rss_collector.py`

```python
"""
RSS Content Collector
Collects articles from RSS feeds and converts to Markdown
"""

import feedparser
import requests
from datetime import datetime
from typing import List, Dict, Optional
import hashlib
from bs4 import BeautifulSoup


class RSSCollector:
    """RSS feed collector"""

    def __init__(self, source_config: Dict):
        """
        Initialize collector

        Args:
            source_config: Source configuration with name, url, tags, priority
        """
        self.name = source_config['name']
        self.url = source_config['url']
        self.tags = source_config.get('tags', [])
        self.priority = source_config.get('priority', 5)

    def collect(self, max_articles: int = 20) -> List[Dict]:
        """
        Collect articles from RSS feed

        Args:
            max_articles: Maximum number of articles to collect

        Returns:
            List of article dictionaries
        """
        try:
            # Set User-Agent to avoid 403 errors
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }

            # Fetch RSS content with requests
            response = requests.get(self.url, headers=headers, timeout=10)
            response.raise_for_status()

            # Parse RSS
            feed = feedparser.parse(response.content)

            articles = []
            for entry in feed.entries[:max_articles]:
                article = self._parse_entry(entry)
                if article:
                    articles.append(article)

            print(f"✅ {self.name}: Collected {len(articles)} articles")
            return articles

        except Exception as e:
            print(f"❌ {self.name}: Collection failed - {str(e)}")
            return []

    def _parse_entry(self, entry) -> Optional[Dict]:
        """Parse RSS entry to standard article format"""
        try:
            # Extract publish time
            published = None
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                published = datetime(*entry.published_parsed[:6])
            elif hasattr(entry, 'updated_parsed') and entry.updated_parsed:
                published = datetime(*entry.updated_parsed[:6])
            else:
                published = datetime.now()

            # Extract summary (remove HTML tags)
            summary = ""
            if hasattr(entry, 'summary'):
                summary = self._clean_html(entry.summary)
            elif hasattr(entry, 'description'):
                summary = self._clean_html(entry.description)

            # Generate unique ID
            article_id = self._generate_id(entry.link)

            return {
                'id': article_id,
                'title': entry.title,
                'url': entry.link,
                'summary': summary,
                'published': published.isoformat(),
                'source': self.name,
                'tags': self.tags,
                'priority': self.priority,
                'collected_at': datetime.now().isoformat()
            }

        except Exception as e:
            print(f"⚠️  Failed to parse entry: {str(e)}")
            return None

    def _clean_html(self, html_content: str) -> str:
        """Remove HTML tags, extract plain text"""
        if not html_content:
            return ""

        soup = BeautifulSoup(html_content, 'html.parser')
        text = soup.get_text(separator=' ', strip=True)

        # Limit length
        if len(text) > 500:
            text = text[:500] + "..."

        return text

    def _generate_id(self, url: str) -> str:
        """Generate unique ID from URL"""
        return hashlib.md5(url.encode()).hexdigest()[:12]


def collect_all_sources(sources_config: Dict, max_per_source: int = 20) -> List[Dict]:
    """
    Collect articles from all configured sources

    Args:
        sources_config: Source configuration dict (tier_a, tier_b, tier_c)
        max_per_source: Max articles per source

    Returns:
        List of all collected articles
    """
    all_articles = []

    for tier_name, sources in sources_config.items():
        print(f"\n📡 Collecting from {tier_name} sources...")

        for source in sources:
            collector = RSSCollector(source)
            articles = collector.collect(max_per_source)
            all_articles.extend(articles)

    print(f"\n✅ Total collected: {len(all_articles)} articles")
    return all_articles
```

### Key Implementation Details

**1. User-Agent Header**
```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...'
}
```
Many RSS feeds block requests without a proper User-Agent header. This was causing 403 errors initially.

**2. Using `requests` + `feedparser`**
```python
response = requests.get(self.url, headers=headers, timeout=10)
feed = feedparser.parse(response.content)
```
We use `requests` to fetch with custom headers, then `feedparser` to parse. Direct `feedparser.parse(url)` doesn't support custom headers.

**3. Deduplication via MD5**
```python
def _generate_id(self, url: str) -> str:
    return hashlib.md5(url.encode()).hexdigest()[:12]
```
Generate unique ID from URL for deduplication tracking.

---

## Web Scraping with Crawl4AI

RSS gives us summaries, but for full content, we need to scrape the actual web pages.

### Why Crawl4AI?

- ✅ Built on Playwright (handles JavaScript-heavy sites)
- ✅ Automatic content extraction (removes ads, navigation)
- ✅ Converts HTML to clean Markdown
- ✅ Async support for parallel scraping

### Implementation: `collectors/web_crawler.py`

```python
"""
Web Content Crawler
Uses Crawl4AI to fetch full article content
"""

from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import LLMExtractionStrategy
import asyncio
from typing import Dict, List
from pathlib import Path


async def crawl_single_article(url: str, config: Dict) -> tuple:
    """
    Crawl a single article URL

    Args:
        url: Article URL
        config: Crawling configuration

    Returns:
        Tuple of (url, markdown_content or None)
    """
    try:
        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(
                url=url,
                bypass_cache=True,
                word_count_threshold=200,  # Minimum words for valid content
            )

            if result.success and result.markdown:
                # Clean up the markdown
                content = result.markdown.strip()
                if len(content) > 300:  # Validate content length
                    print(f"✅ Successfully crawled: {url[:60]}...")
                    return (url, content)

            print(f"⚠️  No valid content: {url[:60]}...")
            return (url, None)

    except Exception as e:
        print(f"❌ Crawl failed: {url[:60]}... - {str(e)}")
        return (url, None)


async def crawl_articles_async(articles: List[Dict], config: Dict) -> Dict[str, str]:
    """
    Crawl multiple articles in parallel

    Args:
        articles: List of article dicts with 'id' and 'url'
        config: Web crawling configuration

    Returns:
        Dict mapping article_id to markdown content
    """
    if not config.get('web_crawling', {}).get('enabled', False):
        return {}

    # Determine which articles to crawl
    mode = config.get('web_crawling', {}).get('mode', 'selective')
    high_priority_sources = config.get('web_crawling', {}).get('strategy', {}).get('high_priority_sources', [])

    articles_to_crawl = []
    for article in articles:
        if mode == 'all':
            articles_to_crawl.append(article)
        elif mode == 'selective' and article.get('source') in high_priority_sources:
            articles_to_crawl.append(article)

    if not articles_to_crawl:
        print("ℹ️  No articles selected for web crawling")
        return {}

    print(f"\n🌐 Crawling {len(articles_to_crawl)} articles...")

    # Create crawling tasks
    tasks = []
    for article in articles_to_crawl:
        task = crawl_single_article(article['url'], config)
        tasks.append(task)

    # Run in parallel with concurrency limit
    max_concurrent = config.get('web_crawling', {}).get('performance', {}).get('max_concurrent', 3)

    results = []
    for i in range(0, len(tasks), max_concurrent):
        batch = tasks[i:i+max_concurrent]
        batch_results = await asyncio.gather(*batch)
        results.extend(batch_results)

    # Map article IDs to content
    web_contents = {}
    success_count = 0

    for article in articles_to_crawl:
        for url, content in results:
            if article['url'] == url and content:
                web_contents[article['id']] = content
                success_count += 1
                break

    print(f"✅ Successfully crawled: {success_count}/{len(articles_to_crawl)} articles\n")
    return web_contents


def crawl_articles_sync(articles: List[Dict], config: Dict) -> Dict[str, str]:
    """
    Synchronous wrapper for async crawling

    Args:
        articles: List of article dicts
        config: Configuration dict

    Returns:
        Dict mapping article_id to markdown content
    """
    return asyncio.run(crawl_articles_async(articles, config))
```

### Crawl4AI Configuration

In `config.yaml`:

```yaml
web_crawling:
  enabled: true  # Enable web scraping
  mode: "selective"  # all=crawl everything | selective=only high-priority

  strategy:
    high_priority_sources:  # Always crawl these sources
      - "Anthropic Blog"
      - "OpenAI Blog"
      - "Google AI Blog"
      - "DeepMind Blog"
      - "Product Hunt - AI Products"

    skip_domains:  # Never crawl these (RSS summary is enough)
      - "twitter.com"
      - "youtube.com"

  performance:
    max_concurrent: 3  # Crawl 3 pages simultaneously
    timeout: 30  # Timeout per page (seconds)
    retry_times: 2  # Retry on failure
```

### Playwright Browser Setup

After installing `playwright`, you need to download browsers:

```bash
# Install Chromium (most compatible)
playwright install chromium

# Or install all browsers
playwright install
```

This downloads browser binaries to `~/.cache/ms-playwright/`.

---

## AI Translation Service

One of the most useful features: **automatic bilingual translation** for English articles.

### Why Bilingual?

- ✅ Learn technical terminology in both languages
- ✅ Verify translation accuracy
- ✅ Better comprehension for non-native speakers

### Implementation: `utils/translation_service.py`

```python
"""
AI Translation Service
Auto-detects English content and translates to Chinese
Creates bilingual (EN/ZH) format
"""

import re
from typing import Optional, Dict
from openai import OpenAI


class TranslationService:
    """AI translation service"""

    def __init__(self, ai_config: Dict):
        """
        Initialize translation service

        Args:
            ai_config: AI configuration from config.yaml
        """
        self.client = OpenAI(
            api_key=ai_config['api_key'],
            base_url=ai_config['base_url']
        )
        self.model = ai_config['model']

    def detect_language(self, text: str) -> str:
        """
        Detect text language

        Args:
            text: Text to detect

        Returns:
            'en' or 'zh' or 'mixed'
        """
        if not text or len(text.strip()) < 10:
            return 'unknown'

        # Count Chinese characters
        chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text))
        # Count English words
        english_words = len(re.findall(r'\b[a-zA-Z]+\b', text))

        total_chars = len(text)
        chinese_ratio = chinese_chars / total_chars if total_chars > 0 else 0

        # If Chinese chars > 30%, consider as Chinese
        if chinese_ratio > 0.3:
            return 'zh'
        # If significant English words, consider as English
        elif english_words > 10:
            return 'en'
        else:
            return 'mixed'

    def translate_to_chinese(self, text: str, context: str = None) -> Optional[str]:
        """
        Translate English to Chinese

        Args:
            text: English text to translate
            context: Context information (e.g., title, summary)

        Returns:
            Translated Chinese text, or None if failed
        """
        try:
            # Build prompt
            system_prompt = """You are a professional AI technical article translator. Your task is to translate English tech articles to Chinese.

Translation requirements:
1. Keep technical terms accurate (AI/LLM/API can remain in English)
2. Translation should be fluent and natural in Chinese
3. Maintain original Markdown formatting (headings, lists, code blocks)
4. Preserve links and code from original
5. Professional, accurate, and easy to understand

Output only the translation, no explanations."""

            user_prompt = f"""Please translate the following English content to Chinese:

{text}"""

            if context:
                user_prompt = f"""Context: {context}

Please translate the following English content to Chinese:

{text}"""

            # Call AI for translation
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.3,  # Lower temperature for accuracy
                max_tokens=4000
            )

            translation = response.choices[0].message.content.strip()
            return translation

        except Exception as e:
            print(f"⚠️  Translation failed: {str(e)}")
            return None

    def translate_article(self, article: Dict) -> Dict:
        """
        Translate article (if needed)

        Args:
            article: Article dictionary

        Returns:
            Article dict with added 'translation' field
        """
        # Detect title language
        title_lang = self.detect_language(article.get('title', ''))
        # Detect content/summary language
        content = article.get('summary', '') or article.get('content', '')
        content_lang = self.detect_language(content)

        # If English, translate it
        if title_lang == 'en' or content_lang == 'en':
            print(f"   🌐 Detected English, translating: {article.get('title', '')[:50]}...")

            # Translate title
            title_zh = None
            if title_lang == 'en':
                title_zh = self.translate_to_chinese(article['title'])

            # Translate content
            content_zh = None
            if content and content_lang == 'en':
                context = f"Article title: {article.get('title', '')}"
                content_zh = self.translate_to_chinese(content, context)

            # Add translation to article
            article['translation'] = {
                'title_zh': title_zh,
                'content_zh': content_zh,
                'is_translated': True
            }

            if title_zh or content_zh:
                print(f"   ✅ Translation complete")

        return article
```

### Using OpenAI-Compatible APIs

The beauty of the OpenAI client library: **it works with any compatible API!**

Supported providers:
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude (via proxy)
- Google Gemini (via OpenRouter)
- Local models (Ollama, LM Studio)
- Azure OpenAI

Configuration in `config.yaml`:

```yaml
ai:
  provider: "openai"  # OpenAI-compatible API
  base_url: "http://your-api-endpoint/v1"  # Your API endpoint
  api_key: "sk-your-api-key-here"
  model: "gemini-2.5-pro-preview-06-05"  # Or gpt-4, claude-3-5-sonnet, etc.

  translation:
    enabled: true  # Enable auto-translation
    auto_detect: true  # Auto-detect English content
    bilingual_format: true  # Generate bilingual output
```

### Example: Using Different Providers

**OpenAI:**
```yaml
ai:
  base_url: "https://api.openai.com/v1"
  api_key: "sk-..."
  model: "gpt-4"
```

**OpenRouter (supports multiple models):**
```yaml
ai:
  base_url: "https://openrouter.ai/api/v1"
  api_key: "sk-or-..."
  model: "google/gemini-2.0-flash-exp"
```

**Local Ollama:**
```yaml
ai:
  base_url: "http://localhost:11434/v1"
  api_key: "ollama"  # Dummy key
  model: "llama2"
```

---

## Saving Articles to Obsidian

Now we have collected, scraped, and translated content. Time to save it!

### Implementation: `utils/article_saver.py`

```python
"""
Article Saver
Saves collected articles as individual Markdown files
"""

from datetime import datetime
from pathlib import Path
from typing import Dict, Optional
import re
from .translation_service import TranslationService


class ArticleSaver:
    """Saves collected articles as Markdown files"""

    def __init__(self, vault_path: str, archive_folder: str, ai_config: Dict = None):
        """
        Initialize article saver

        Args:
            vault_path: Obsidian vault path
            archive_folder: Archive storage folder
            ai_config: AI config (for translation)
        """
        self.vault_path = Path(vault_path)
        self.archive_folder = self.vault_path / archive_folder

        # Initialize translation service
        self.translation_service = None
        self.translation_enabled = False
        if ai_config and ai_config.get('translation', {}).get('enabled', False):
            try:
                self.translation_service = TranslationService(ai_config)
                self.translation_enabled = True
                print("✅ AI translation service enabled (bilingual format)")
            except Exception as e:
                print(f"⚠️  Translation service init failed: {e}")

    def save_all_articles(self, articles: list, web_contents: Dict[str, str] = None, date: datetime = None) -> Dict:
        """
        Save all collected articles as individual Markdown files

        Args:
            articles: List of articles
            web_contents: Dict of full web content {article_id: markdown_content}
            date: Date (default today)

        Returns:
            Save statistics
        """
        if date is None:
            date = datetime.now()

        if web_contents is None:
            web_contents = {}

        # Create date folder
        date_folder = self.archive_folder / date.strftime('%Y-%m-%d')
        date_folder.mkdir(parents=True, exist_ok=True)

        saved_count = 0
        full_content_count = 0
        translated_count = 0
        by_source = {}

        for i, article in enumerate(articles, 1):
            try:
                # Check if full web content available
                article_id = article.get('id')
                full_content = web_contents.get(article_id) if article_id else None

                # AI translation (if enabled)
                if self.translation_service:
                    # If full content available, temporarily add to article for translation
                    if full_content:
                        article['content'] = full_content

                    article = self.translation_service.translate_article(article)

                    # Remove temporary content field after translation
                    if full_content and 'content' in article:
                        del article['content']

                    if article.get('translation', {}).get('is_translated'):
                        translated_count += 1

                # Save single article
                filepath = self._save_single_article(article, date_folder, i, full_content)
                saved_count += 1
                if full_content:
                    full_content_count += 1

                # Track by source
                source = article.get('source', 'Unknown')
                if source not in by_source:
                    by_source[source] = []
                by_source[source].append({
                    'filepath': filepath,
                    'title': article['title'],
                    'url': article['url'],
                    'has_full_content': bool(full_content)
                })

            except Exception as e:
                print(f"⚠️  Failed to save article: {article.get('title', 'Unknown')} - {e}")

        print(f"✅ Saved {saved_count} articles to: {date_folder}")
        print(f"   - Full content: {full_content_count} articles")
        print(f"   - RSS summary: {saved_count - full_content_count} articles")
        if translated_count > 0:
            print(f"   - Bilingual (EN/ZH): {translated_count} articles 🌐")

        return {
            'saved_count': saved_count,
            'full_content_count': full_content_count,
            'translated_count': translated_count,
            'date_folder': str(date_folder),
            'by_source': by_source
        }

    def _generate_markdown(self, article: Dict, full_content: str = None) -> str:
        """Generate Markdown format for article"""

        # Parse publish time
        try:
            published = datetime.fromisoformat(article['published'])
            published_str = published.strftime('%Y-%m-%d %H:%M')
        except:
            published_str = article.get('published', 'Unknown')

        # Get translation info
        translation = article.get('translation', {})
        has_translation = translation.get('is_translated', False)

        # Frontmatter
        frontmatter = f"""---
title: "{article['title']}"
source: {article['source']}
url: {article['url']}
published: {published_str}
collected: {article.get('collected_at', datetime.now().isoformat())}
tags: {article.get('tags', [])}
priority: {article.get('priority', 5)}
has_full_content: {bool(full_content)}
has_translation: {has_translation}
---

"""

        # If full content available
        if full_content:
            # Title section (bilingual if translated)
            title_section = f"# {article['title']}"
            if has_translation and translation.get('title_zh'):
                title_section = f"""# {translation['title_zh']}
## {article['title']}"""

            # Content section (bilingual if translated)
            content_section = f"""## 📄 Full Content

{full_content}"""

            if has_translation and translation.get('content_zh'):
                content_section = f"""## 📖 Chinese Translation

{translation['content_zh']}

---

## 🔤 English Original

{full_content}"""

            body = f"""{title_section}

> **✅ Full Article**{' | 🌐 Bilingual' if has_translation else ''}
> This file contains full web content (converted to Markdown).
> Supports offline reading without visiting original site.

**Source**: {article['source']}
**Published**: {published_str}
**Original**: [{article['url']}]({article['url']})

---

{content_section}

---

## Tags

{', '.join(f'#{tag}' for tag in article.get('tags', []))}

---

## 💡 Action Items

- [ ] Read full content
- [ ] Worth deep dive
- [ ] Create notes → [[]]
- [ ] Archive

---

*Auto-collected by MyBrain on {datetime.now().strftime('%Y-%m-%d %H:%M')}*
*Full web content | Offline reading*{' | 🌐 AI translation' if has_translation else ''}
"""
        else:
            # RSS summary only
            # Title section (bilingual if translated)
            title_section = f"# {article['title']}"
            if has_translation and translation.get('title_zh'):
                title_section = f"""# {translation['title_zh']}
## {article['title']}"""

            # Summary section (bilingual if translated)
            summary = article.get('summary', 'No summary')
            summary_section = f"""## RSS Summary

{summary}"""

            if has_translation and translation.get('content_zh'):
                summary_section = f"""## 📖 Chinese Translation

{translation['content_zh']}

---

## 🔤 English Original

{summary}"""

            body = f"""{title_section}

> **⚠️ Collection Info**{' | 🌐 Bilingual' if has_translation else ''}
> This file contains RSS summary, **not full article**.
> Click "View full article" link below for complete content.

**Source**: {article['source']}
**Published**: {published_str}
**View full article**: [{article['url']}]({article['url']})

---

{summary_section}

---

## Tags

{', '.join(f'#{tag}' for tag in article.get('tags', []))}

---

## 💡 Action Items

- [ ] Read full article
- [ ] Worth deep dive
- [ ] Create notes → [[]]
- [ ] Archive

---

*Auto-collected by MyBrain on {datetime.now().strftime('%Y-%m-%d %H:%M')}*
*RSS summary | Not full article*{' | 🌐 AI translation' if has_translation else ''}
"""

        return frontmatter + body
```

### Bilingual Output Format

When an English article is detected and translated, the saved Markdown looks like:

```markdown
---
title: "UnisonDB – A Log-Native Database for Edge AI"
source: Hacker News - AI
url: https://example.com/article
has_translation: true
---

# UnisonDB – 专为边缘AI设计的日志原生数据库
## UnisonDB – A Log-Native Database for Edge AI

> **✅ Full Article** | 🌐 Bilingual
> This file contains full web content (converted to Markdown).

---

## 📖 Chinese Translation

【完整的中文翻译内容...】

---

## 🔤 English Original

【完整的英文原文...】

---

*Auto-collected by MyBrain on 2025-11-09 10:30*
*Full web content | Offline reading | 🌐 AI translation*
```

This format allows you to:
- Read Chinese translation first for quick comprehension
- Reference English original for technical terms
- Learn vocabulary in both languages

---

## Configuration File

The brain of the system: `config.yaml`

```yaml
# Collection schedule
schedule:
  collection_time: "08:00"  # Daily at 8 AM
  timezone: "Asia/Shanghai"

# Content sources
sources:
  # Tier A - Core AI sources (must-read)
  tier_a:
    - name: "Anthropic Blog"
      type: "rss"
      url: "https://www.anthropic.com/news/rss.xml"
      tags: ["AI", "Claude", "LLM", "AI Research"]
      priority: 10

    - name: "OpenAI Blog"
      type: "rss"
      url: "https://openai.com/blog/rss.xml"
      tags: ["AI", "GPT", "AI Research"]
      priority: 10

    - name: "Google AI Blog"
      type: "rss"
      url: "https://blog.google/technology/ai/rss/"
      tags: ["AI", "Google", "AI Research"]
      priority: 10

    - name: "DeepMind Blog"
      type: "rss"
      url: "https://deepmind.google/blog/rss.xml"
      tags: ["AI", "DeepMind", "AI Research"]
      priority: 10

  # Tier B - AI development & tools
  tier_b:
    - name: "Hacker News - AI"
      type: "rss"
      url: "https://hnrss.org/newest?q=AI+OR+LLM+OR+ChatGPT"
      tags: ["AI", "Tech News", "AI Applications"]
      priority: 8

    - name: "Towards Data Science - AI"
      type: "rss"
      url: "https://towardsdatascience.com/feed"
      tags: ["AI", "ML", "AI Development"]
      priority: 7

    - name: "Papers with Code"
      type: "rss"
      url: "https://paperswithcode.com/latest"
      tags: ["AI Papers", "Research", "ML"]
      priority: 7

  # Tier C - AI startups & products
  tier_c:
    - name: "Product Hunt - AI Products"
      type: "rss"
      url: "https://www.producthunt.com/feed?category=artificial-intelligence"
      tags: ["AI Product", "AI Startup", "Product"]
      priority: 8

# Filtering settings
filtering:
  max_articles_per_source: 20
  min_content_length: 200
  daily_selection_count: 8

  scoring_weights:
    relevance: 0.4
    recency: 0.2
    source_priority: 0.2
    engagement: 0.2

# User interests (for AI filtering)
user_interests:
  primary:
    - "AI/LLM"
    - "AI Agents"
    - "Large Language Models"
    - "AI Application Development"
    - "AI Tools & Products"
    - "AI Startup Cases"
    - "Prompt Engineering"
    - "Web Development"
    - "Python"

  secondary:
    - "AI Research Papers"
    - "Machine Learning"
    - "Product Hunt AI Products"
    - "AI Industry News"
    - "AI Monetization"
    - "AI Automation"
    - "FastAPI"
    - "API Development"
    - "AI Agent Framework"
    - "LangChain/AutoGPT"

# Obsidian integration
obsidian:
  vault_path: "/Users/yourname/YourObsidianVault"

  paths:
    daily_digest: "📬 Daily Digest"
    raw_archive: "023 Internet/Auto"

  naming:
    daily_digest: "📬 {date} Daily Digest.md"
    raw_article: "{source}/{date}/{title}.md"

# AI configuration
ai:
  provider: "openai"
  base_url: "https://your-api-endpoint/v1"
  api_key: "sk-your-api-key-here"
  model: "gemini-2.5-pro-preview-06-05"
  max_summary_length: 200

  translation:
    enabled: true  # Enable auto-translation
    auto_detect: true  # Auto-detect English content
    bilingual_format: true  # Generate bilingual format

# Web scraping
web_crawling:
  enabled: true
  mode: "selective"  # all | selective

  strategy:
    high_priority_sources:
      - "Anthropic Blog"
      - "OpenAI Blog"
      - "Google AI Blog"
      - "DeepMind Blog"
      - "Product Hunt - AI Products"

    skip_domains:
      - "twitter.com"
      - "youtube.com"

  performance:
    max_concurrent: 3
    timeout: 30
    retry_times: 2

# Metadata storage
metadata:
  index_file: "_automation/_meta/index.json"
  collection_log: "_automation/_meta/collection_log.json"
```

---

## Main Collector Script

The orchestrator: `main_collector.py`

```python
#!/usr/bin/env python3
"""
Main Collector
Orchestrates the entire collection workflow
"""

import yaml
from datetime import datetime
from pathlib import Path
from typing import List, Dict
import sys

# Add project path
sys.path.insert(0, str(Path(__file__).parent))

from collectors.rss_collector import collect_all_sources
from collectors.web_crawler import crawl_articles_sync
from utils.metadata_manager import MetadataManager
from utils.article_saver import ArticleSaver
from utils.catalog_generator import CatalogGenerator


class MainCollector:
    """Main collection controller"""

    def __init__(self, config_path: str = None):
        """
        Initialize main collector

        Args:
            config_path: Path to configuration file
        """
        if config_path is None:
            config_path = Path(__file__).parent / "config.yaml"

        # Load configuration
        with open(config_path, 'r', encoding='utf-8') as f:
            self.config = yaml.safe_load(f)

        # Initialize components
        self.metadata_manager = MetadataManager(
            index_path=self.config['metadata']['index_file'],
            log_path=self.config['metadata']['collection_log']
        )

        self.article_saver = ArticleSaver(
            vault_path=self.config['obsidian']['vault_path'],
            archive_folder=self.config['obsidian']['paths']['raw_archive'],
            ai_config=self.config.get('ai')  # Pass AI config for translation
        )

        self.catalog_generator = CatalogGenerator(
            vault_path=self.config['obsidian']['vault_path'],
            digest_folder=self.config['obsidian']['paths']['daily_digest']
        )

    def run_daily_collection(self):
        """Execute daily collection workflow"""
        print("=" * 60)
        print(f"🚀 Starting daily content collection - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)

        start_time = datetime.now()

        # Step 1: Collect from all sources
        print("\n📡 Step 1: Collecting content from sources...")
        all_articles = collect_all_sources(
            sources_config=self.config['sources'],
            max_per_source=self.config['filtering']['max_articles_per_source']
        )

        if not all_articles:
            print("❌ No articles collected, exiting")
            return

        # Step 2: Deduplication
        print("\n🔍 Step 2: Filtering out already collected articles...")
        new_articles = self.metadata_manager.filter_duplicates(all_articles)

        if not new_articles:
            print("ℹ️  No new articles, exiting")
            return

        # Step 3: Web scraping (if enabled)
        web_contents = {}
        if self.config.get('web_crawling', {}).get('enabled', False):
            print(f"\n🌐 Step 3: Scraping full web content...")
            try:
                web_contents = crawl_articles_sync(new_articles, self.config)
            except Exception as e:
                print(f"⚠️  Web scraping failed: {e}")
                print("   Continuing with RSS summaries...")
        else:
            print(f"\n⏭️  Step 3: Web scraping disabled, skipping")

        # Step 4: Save all articles (with translation)
        print(f"\n💾 Step 4: Saving all {len(new_articles)} articles...")
        saved_files = self.article_saver.save_all_articles(new_articles, web_contents)

        # Step 5: Generate catalog
        print(f"\n📝 Step 5: Generating complete catalog...")

        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()

        # Statistics
        stats = {
            'total_collected': len(all_articles),
            'new_articles': len(new_articles),
            'sources_count': self._count_sources(),
            'collection_time': start_time.strftime('%Y-%m-%d %H:%M:%S'),
            'processing_duration': f'{duration:.1f}s'
        }

        catalog_path = self.catalog_generator.generate_full_catalog(
            articles=new_articles,
            saved_files=saved_files,
            stats=stats
        )

        # Step 6: Log collection
        stats['full_content_count'] = saved_files.get('full_content_count', 0)
        stats['web_crawling_enabled'] = self.config.get('web_crawling', {}).get('enabled', False)
        self.metadata_manager.log_collection(stats)

        # Complete
        print("\n" + "=" * 60)
        print(f"✅ Collection complete!")
        print(f"📊 Collected: {len(all_articles)} articles → New: {len(new_articles)} articles")
        if saved_files.get('full_content_count', 0) > 0:
            print(f"🌐 Full content: {saved_files['full_content_count']} | RSS: {len(new_articles) - saved_files['full_content_count']}")
        if saved_files.get('translated_count', 0) > 0:
            print(f"🌐 Bilingual (EN/ZH): {saved_files['translated_count']} articles")
        print(f"💾 Saved to: {saved_files['date_folder']}")
        print(f"📄 Catalog: {catalog_path}")
        print(f"⏱️  Duration: {duration:.1f}s")
        print("=" * 60)
        print(f"\n💡 Next steps:")
        print(f"   1. Open Obsidian: 📬 Daily Digest/")
        print(f"   2. Browse all {len(new_articles)} articles")
        if saved_files.get('translated_count', 0) > 0:
            print(f"   3. Bilingual articles (marked 🌐) are easier to read")
        if saved_files.get('full_content_count', 0) > 0:
            print(f"   4. Full content articles (marked ✅) support offline reading")
        print(f"   5. Enjoy your curated knowledge base!")

    def _count_sources(self) -> int:
        """Count configured sources"""
        count = 0
        for tier in self.config['sources'].values():
            count += len(tier)
        return count


def main():
    """Main function"""
    try:
        collector = MainCollector()
        collector.run_daily_collection()

    except KeyboardInterrupt:
        print("\n\n⚠️  Collection interrupted by user")
        sys.exit(0)

    except Exception as e:
        print(f"\n\n❌ Collection error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
```

---

## Automating with Cron Jobs

Now let's make it run automatically every day!

### What is Cron?

Cron is a time-based job scheduler in Unix-like systems. It runs commands/scripts at specified times.

### Setting Up Cron Job

**1. Open crontab editor:**

```bash
crontab -e
```

**2. Add your job:**

```bash
# Run collection every day at 8:00 AM
0 8 * * * cd /Users/yourname/YourObsidianVault/_automation && /usr/bin/python3 main_collector.py >> /tmp/mybrain_collection.log 2>&1
```

**Breakdown:**
- `0 8 * * *` - At minute 0, hour 8, every day
- `cd /path/to/_automation` - Navigate to project directory
- `&&` - AND operator (only run next command if cd succeeds)
- `/usr/bin/python3` - Full path to Python (use `which python3` to find yours)
- `main_collector.py` - Run the collection script
- `>>` - Append output to log file
- `/tmp/mybrain_collection.log` - Log file location
- `2>&1` - Redirect errors to same log file

**3. Save and exit** (usually `:wq` in vim or `Ctrl+X` in nano)

**4. Verify cron job is scheduled:**

```bash
crontab -l
```

### Cron Time Format

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-6, 0=Sunday)
│ │ │ │ │
* * * * *
```

**Examples:**

```bash
# Every day at 8:00 AM
0 8 * * *

# Every day at 8:00 AM and 8:00 PM
0 8,20 * * *

# Every hour
0 * * * *

# Every Monday at 9:00 AM
0 9 * * 1

# Every 30 minutes
*/30 * * * *
```

### Using Virtual Environment in Cron

If you're using a virtual environment, activate it in the command:

```bash
0 8 * * * cd /path/to/_automation && source venv/bin/activate && python main_collector.py >> /tmp/mybrain.log 2>&1
```

Or use the virtual environment's Python directly:

```bash
0 8 * * * cd /path/to/_automation && /path/to/_automation/venv/bin/python main_collector.py >> /tmp/mybrain.log 2>&1
```

### Viewing Cron Logs

Check if it ran successfully:

```bash
# View last 50 lines of log
tail -50 /tmp/mybrain_collection.log

# Follow log in real-time
tail -f /tmp/mybrain_collection.log

# Search for errors
grep "❌" /tmp/mybrain_collection.log
```

### Testing Cron Job

Don't wait until 8 AM to see if it works! Test it now:

```bash
# Run manually
cd /path/to/_automation
python main_collector.py

# Or test the exact cron command
/usr/bin/python3 /path/to/_automation/main_collector.py
```

### Alternative: Launchd (macOS)

On macOS, `launchd` is more reliable than cron. Create a plist file:

**`~/Library/LaunchAgents/com.mybrain.collector.plist`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.mybrain.collector</string>

    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/yourname/YourObsidianVault/_automation/main_collector.py</string>
    </array>

    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>8</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>

    <key>StandardOutPath</key>
    <string>/tmp/mybrain_collection.log</string>

    <key>StandardErrorPath</key>
    <string>/tmp/mybrain_collection_error.log</string>

    <key>WorkingDirectory</key>
    <string>/Users/yourname/YourObsidianVault/_automation</string>
</dict>
</plist>
```

**Load and start:**

```bash
# Load the job
launchctl load ~/Library/LaunchAgents/com.mybrain.collector.plist

# Test run it immediately
launchctl start com.mybrain.collector

# Check if it's loaded
launchctl list | grep mybrain

# View logs
cat /tmp/mybrain_collection.log
```

---

## Troubleshooting

### Issue 1: RSS 403 Forbidden Errors

**Problem:** Some RSS feeds block requests without User-Agent.

**Solution:**
```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}
response = requests.get(url, headers=headers, timeout=10)
```

### Issue 2: Pip Install Taking Forever

**Problem:** `pip install` hangs for 10+ minutes resolving dependencies.

**Solution:** Pin specific versions in `requirements.txt`:
```txt
# Bad - too loose
crawl4ai>=0.3.0

# Good - specific version
crawl4ai==0.4.24
```

Also pin `urllib3`:
```txt
urllib3==2.2.3
```

### Issue 3: Translation Not Working

**Problem:** Translation service runs but content isn't translated.

**Root cause:** Translation service only sees RSS summary, not full web content.

**Solution:** Pass full content to translation service:
```python
# If full content available, add to article temporarily
if full_content:
    article['content'] = full_content

article = self.translation_service.translate_article(article)

# Remove temporary field
if full_content and 'content' in article:
    del article['content']
```

### Issue 4: Playwright Browser Not Found

**Problem:** `Error: Executable doesn't exist at /path/to/chromium`

**Solution:**
```bash
playwright install chromium
```

Make sure to run this in your virtual environment if using one.

### Issue 5: Cron Job Not Running

**Debugging steps:**

1. **Check if cron is running:**
```bash
ps aux | grep cron
```

2. **Check cron job syntax:**
```bash
crontab -l
```

3. **Check absolute paths:**
```bash
# Find Python path
which python3

# Use absolute paths in cron
0 8 * * * /usr/bin/python3 /full/path/to/script.py
```

4. **Check environment variables:**
```bash
# Add to crontab
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin

0 8 * * * ...
```

5. **Check logs:**
```bash
tail -50 /tmp/mybrain_collection.log

# Or system cron logs
grep CRON /var/log/syslog  # Linux
log show --predicate 'process == "cron"' --last 1h  # macOS
```

### Issue 6: API Rate Limiting

**Problem:** Translation fails after many requests.

**Solution:** Add rate limiting:
```python
import time

for article in articles:
    article = translate_service.translate_article(article)
    time.sleep(1)  # Wait 1 second between requests
```

Or implement retry logic:
```python
def translate_with_retry(self, text, max_retries=3):
    for attempt in range(max_retries):
        try:
            return self.translate_to_chinese(text)
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            raise
```

---

## Best Practices

### 1. Use Virtual Environments

Always use virtual environments for Python projects:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Benefits:
- ✅ Isolated dependencies
- ✅ No conflicts with system Python
- ✅ Easy to reproduce on other machines

### 2. Version Control with Git

Track your configuration and code:

```bash
git init
git add _automation/
git commit -m "Initial commit"
```

Add `.gitignore`:
```
venv/
_meta/*.json
*.pyc
__pycache__/
.DS_Store
```

### 3. Separate Configuration from Code

Store sensitive data (API keys) separately:

```bash
# config.yaml (tracked in git)
ai:
  base_url: "https://api.openai.com/v1"
  model: "gpt-4"

# config.local.yaml (NOT tracked in git)
ai:
  api_key: "sk-your-secret-key"
```

Load both:
```python
import yaml

with open('config.yaml') as f:
    config = yaml.safe_load(f)

try:
    with open('config.local.yaml') as f:
        local_config = yaml.safe_load(f)
        config.update(local_config)
except FileNotFoundError:
    pass
```

### 4. Implement Logging

Use Python's `logging` module instead of `print`:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('_automation/logs/collection.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Use it
logger.info("Starting collection...")
logger.error(f"Failed to collect from {source}: {error}")
```

### 5. Add Error Notifications

Get notified when collection fails:

```python
def send_notification(message):
    """Send notification via Telegram/Slack/Email"""
    try:
        # Implement your preferred notification method
        pass
    except:
        pass

try:
    collector.run_daily_collection()
except Exception as e:
    send_notification(f"❌ Collection failed: {str(e)}")
    raise
```

### 6. Monitor Collection Stats

Track metrics over time:

```python
# In collection_log.json
{
  "2025-11-09": {
    "total_collected": 140,
    "new_articles": 15,
    "translated": 8,
    "duration": 34.8,
    "sources": 11
  }
}
```

Create a dashboard script:

```python
import json
from datetime import datetime, timedelta

with open('_meta/collection_log.json') as f:
    logs = json.load(f)

# Last 7 days stats
week_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
recent_logs = {k: v for k, v in logs.items() if k >= week_ago}

print(f"📊 Collection stats (last 7 days):")
print(f"  Total articles: {sum(log['total_collected'] for log in recent_logs.values())}")
print(f"  New articles: {sum(log['new_articles'] for log in recent_logs.values())}")
print(f"  Avg duration: {sum(log['duration'] for log in recent_logs.values()) / len(recent_logs):.1f}s")
```

### 7. Backup Your Data

Regularly backup your Obsidian vault and collection metadata:

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="$HOME/Backups/MyBrain"

mkdir -p "$BACKUP_DIR"

# Backup vault
tar -czf "$BACKUP_DIR/vault-$DATE.tar.gz" -C "$HOME/MyBrain" .

# Backup metadata
cp "$HOME/MyBrain/_automation/_meta/index.json" "$BACKUP_DIR/index-$DATE.json"
cp "$HOME/MyBrain/_automation/_meta/collection_log.json" "$BACKUP_DIR/log-$DATE.json"

# Keep only last 30 days
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "✅ Backup complete: $BACKUP_DIR"
```

Schedule it:
```bash
0 9 * * * /path/to/backup.sh
```

---

## Conclusion

Congratulations! You've built a fully automated AI-powered content collection system! 🎉

### What We've Accomplished

✅ **Automated content collection** from 11+ AI sources
✅ **Full web scraping** with Crawl4AI + Playwright
✅ **AI-powered translation** for bilingual reading
✅ **Smart deduplication** to avoid repeated content
✅ **Organized storage** in Obsidian Markdown format
✅ **Scheduled automation** with cron jobs

### Next Steps

**Enhance the system:**
1. **Add more sources** - Reddit, Twitter, newsletters
2. **Implement AI summarization** - Generate TL;DR with GPT-4
3. **Smart filtering** - Use AI to score relevance to your interests
4. **Email digest** - Send daily summary to your inbox
5. **Mobile sync** - Use Obsidian Sync or Git for mobile access

**Advanced features:**
- **Semantic search** - Use embeddings for better search
- **Topic clustering** - Automatically group related articles
- **Readability scoring** - Prioritize easy-to-read content
- **Custom extraction** - Extract code snippets, diagrams, etc.
- **Multi-language support** - Translate to multiple languages

### Key Takeaways

**1. Automation saves time**
15 minutes/day reading → 5 minutes/day with curated content = **70% time saved**

**2. AI amplifies productivity**
Translation + summarization means you can process **3x more content** in the same time

**3. Second brain compounds**
Your Obsidian vault becomes more valuable as it grows, with bidirectional links creating a knowledge network

**4. Tools over rules**
Automation ensures consistency. You don't need willpower to stay updated—the system does it for you.

### Resources

**Code Repository:**
- Full source code: [GitHub link]
- Example config files
- Troubleshooting guide

**Further Reading:**
- [Crawl4AI Documentation](https://crawl4ai.com)
- [Obsidian Documentation](https://help.obsidian.md)
- [Building a Second Brain](https://www.buildingasecondbrain.com/)

**My Setup:**
- **Sources:** 11 AI-focused RSS feeds
- **Collection:** Daily at 8 AM
- **Volume:** ~100 articles/day → 8-15 new articles
- **Time saved:** 10+ hours/week

---

## About the Author

Built with **Claude Code** - Anthropic's AI pair programming assistant. This entire system was developed in ~2 hours through natural language conversation with Claude Code on the web.

Claude Code helps with:
- Architecture design
- Code generation
- Debugging
- Best practices
- Documentation

Try it yourself: [claude.ai/code](https://claude.ai/code)

---

**Have questions?** Leave a comment below or reach out on [Twitter/X](#) | [GitHub](#)

**Found this useful?** Share it with fellow knowledge workers! 🚀

---

*Last updated: November 9, 2025*
*License: MIT*
