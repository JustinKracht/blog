import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../../lib/og';

export async function getStaticPaths() {
  const entries = await getCollection('research', ({ data }) => !data.draft);
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection>>[number] };
  const png = await renderOgImage({ eyebrow: 'Research', title: entry.data.title });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
