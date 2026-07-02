import type { APIRoute } from 'astro';
import { renderOgImage } from '../../lib/og';

export const GET: APIRoute = async () => {
  const png = await renderOgImage({ eyebrow: 'justinkracht.com', title: 'Justin Kracht' });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
