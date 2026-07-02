// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

// Deployed to GitHub Pages as a project site (justinkracht/blog) until the
// custom domain (justinkracht.com) is purchased and DNS is pointed at Pages.
// Once that happens: drop `base`, add a `public/CNAME` file, and update `site`.
export default defineConfig({
  site: 'https://justinkracht.github.io',
  base: '/blog',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      // /research/demo is a component-library reference page, not content.
      filter: (page) => !page.includes('/research/demo'),
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
