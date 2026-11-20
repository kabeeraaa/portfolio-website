# Kabir Dubey Portfolio

This Vite and React project contains two experiences with the same dark blue and cyan theme.

| URL fragment | Experience | Entry component |
| --- | --- | --- |
| `#/` | Professional, scrollable portfolio | `src/App.tsx` |
| `#/game` | Interactive portfolio with an operator avatar, section menu, and project dialogs | `src/GamePortfolio.tsx` |

`src/PortfolioShell.tsx` reads the URL hash, switches modes, and owns the mode transition. An empty or unrecognized hash displays Main. The section navigation within each mode keeps the current mode hash.

Both modes read the same typed records in `src/components/data/`. Profile and contact, experience, academics and certifications, projects and their technology stacks, and categorized skills each have their own module. Main composes the profile hero and section components. Game composes the avatar, menu, animated panel, and project dialog. Game certifications are grouped under Education.

## Featured repositories

- [Kanban Board](https://github.com/kabeeraaa/kanban-board)
- [Bake My Cake](https://github.com/kabeeraaa/bake-my-cake)
- [Jummpy Bunny](https://github.com/kabeeraaa/jummpybunny)

## Local development

The locked Vite version requires Node 20.19+ or 22.12+. Node 22.14 was used for verification.

```sh
npm ci
npm run dev
npm run lint
npm run build
npx playwright install chromium firefox webkit
npm test
```

Playwright starts its own Vite server and runs Chromium, Firefox, and WebKit. Use `npm test -- --project=chromium` to run one engine. To use an existing Chrome or Edge installation for the Chromium project, set `PLAYWRIGHT_CHANNEL` to `chrome` or `msedge`.

The browser suite covers hash history, both modes at five viewport sizes, keyboard and touch navigation, project dialog focus and dismissal, reduced motion, and reachability of long Game panels.

## Production build and hosting

Use Node 22 for the release build. The commands below build and preview the output locally.

```sh
npm ci
npm run lint
npm run build
npm run preview
```

Serve the contents of `dist/` at the domain root. Select the Vite preset on [Vercel](https://vercel.com/docs/frameworks/frontend/vite), or use the Vite build settings on [Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/). Both use `npm run build` and the `dist` output directory. The app requires no environment variables or server runtime. The browser handles `#/` and `#/game` after loading the root document, so these URLs require no rewrite rules.

Keep the lockfile in Git and leave `node_modules/`, `dist/`, local environment files, and test output ignored. Review the public contact details before connecting an approved GitHub repository to a host. Verify the host's response headers on a preview. Revalidate HTML with `Cache-Control: no-cache` and use `Cache-Control: public, max-age=31536000, immutable` for content-hashed files under `/assets/`. Keep the unhashed favicon on a shorter or revalidating policy. [Vercel cache headers](https://vercel.com/docs/caching/cache-control-headers) · [Netlify caching](https://docs.netlify.com/build/caching/caching-overview/)

## Search and social previews

The root document has the title, description, and social tags. Main is the default view and the primary content for indexing. Its full content is client-rendered, and a short introduction is available with JavaScript disabled. Both fragments share the same HTML and metadata, so Game should be treated as an on-site experience rather than a separate search result or share preview. [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Once the public HTTPS address and a share image are approved, add the canonical URL, `og:url`, and `og:image` and verify the live preview. [Open Graph protocol](https://ogp.me/)
