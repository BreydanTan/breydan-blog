# Deployment to Cloudflare Workers with OpenNext.js

## Prerequisites
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

## Setup Steps

### 1. Login to Cloudflare
```bash
wrangler login
```

### 2. Create KV namespace for caching
```bash
wrangler kv:namespace create "CACHE"
```
Copy the namespace ID and update it in `wrangler.toml`

### 3. Create Cloudflare Pages project
```bash
wrangler pages project create nextjs-blog-template
```

### 4. Build for Cloudflare
```bash
npm run build:cloudflare
```

### 5. Deploy to Cloudflare Pages
```bash
npm run deploy
```

## Configuration Files

### next.config.ts
- Added `output: 'standalone'` for OpenNext.js compatibility
- Configured experimental options

### open-next.config.ts
- Configured for Cloudflare Workers runtime
- Set up KV caching for incremental cache

### wrangler.toml
- Cloudflare Pages configuration
- KV namespace bindings
- Environment variables

## Environment Variables
Set these in Cloudflare dashboard if needed:
- `NODE_ENV=production`
- Any API keys or secrets

## Custom Domain
After deployment, you can add a custom domain in the Cloudflare Pages dashboard.

## Performance Benefits
- Global edge distribution
- ~150ms SSR response time
- Automatic caching with KV
- Cost-effective compared to Vercel