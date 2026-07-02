declare module 'bibtex-parse' {
  export function entries(bibtex: string): Array<Record<string, unknown> & { key: string; type: string }>;
  export function parse(bibtex: string, options?: Record<string, unknown>): unknown[];
}
