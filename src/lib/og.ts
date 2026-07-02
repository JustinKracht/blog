import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Resolved against the project root (process.cwd()) rather than this file's
// URL, since this module gets bundled into dist/ during build and a
// URL-relative path would no longer point at node_modules.
const fontsDir = join(process.cwd(), 'node_modules', '@fontsource');

const serifRegular = readFileSync(`${fontsDir}/andada-pro/files/andada-pro-latin-400-normal.woff`);
const serifBold = readFileSync(`${fontsDir}/andada-pro/files/andada-pro-latin-700-normal.woff`);
const sansRegular = readFileSync(`${fontsDir}/alegreya-sans/files/alegreya-sans-latin-400-normal.woff`);

const COLORS = {
  bg: '#f5f2eb',
  ink: '#2b2523',
  crimson: '#842b32',
  hairline: '#dad3c3',
  ochre: '#7f6230',
};

interface OgImageOptions {
  eyebrow: string;
  title: string;
}

export async function renderOgImage({ eyebrow, title }: OgImageOptions): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.bg,
          padding: '80px',
          fontFamily: 'Andada Pro',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontFamily: 'Alegreya Sans',
                fontSize: '28px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: COLORS.ochre,
              },
              children: eyebrow,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '64px',
                fontWeight: 700,
                lineHeight: 1.15,
                color: COLORS.ink,
                maxWidth: '980px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: `2px solid ${COLORS.hairline}`,
                paddingTop: '28px',
                fontFamily: 'Alegreya Sans',
                fontSize: '28px',
                color: COLORS.crimson,
              },
              children: 'justinkracht.com',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Andada Pro', data: serifRegular, weight: 400, style: 'normal' },
        { name: 'Andada Pro', data: serifBold, weight: 700, style: 'normal' },
        { name: 'Alegreya Sans', data: sansRegular, weight: 400, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return Uint8Array.from(resvg.render().asPng());
}
