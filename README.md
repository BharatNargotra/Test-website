# Caira AI Test Site

Standalone React/Vite website designed to test Caira crawling and retrieval.

## Local
```bash
npm install
npm run dev
```

## Deploy
Works with Vercel, Netlify, Cloudflare Pages, or any static host that supports a Vite build.

Build:
```bash
npm run build
```

Output directory: `dist`

## Caira testing
After deployment:
1. Add the deployed URL as a Caira site.
2. Crawl the site.
3. Use the generated sitemap if your crawler supports sitemap-first discovery.
4. Test exact queries such as `RRF`, `HNSW`, `transformer attention`, `embedding dimensions`, `agent memory`, `hallucination`, and `retrieval quality`.
5. Test insufficient-information queries such as `quantum networking in 1998`.
6. Test source citation/highlighting on individual topic pages.

Before production deployment, replace `YOUR-DOMAIN.example` in `public/sitemap.xml` and `public/robots.txt` with the deployed domain.


## Multi-page Caira test corpus

The project now includes 20 real static article URLs. Each article is located at
`/<slug>/index.html` and contains 14 substantial, individually addressable
paragraphs plus FAQ content. This is intentional so a crawler can discover each
URL independently and Caira can test exact source highlighting.

Example URLs:
- `/rag/`
- `/embeddings/`
- `/vector-databases/`
- `/transformers/`
- `/ai-agents/`

The sitemap lists all 20 article URLs. Replace `YOUR-DOMAIN.example` in
`public/sitemap.xml` and `public/robots.txt` after deployment.
