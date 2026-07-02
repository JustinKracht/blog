import { entries as parseBibtexEntries } from 'bibtex-parse';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Reference {
  key: string;
  type: string;
  author: string;
  title: string;
  journal?: string;
  year?: string | number;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
}

interface ParsedBibtexEntry {
  key: string;
  type: string;
  AUTHOR?: string;
  TITLE?: string;
  JOURNAL?: string;
  YEAR?: string | number;
  VOLUME?: string;
  NUMBER?: string;
  PAGES?: string;
  DOI?: string;
}

let cache: Reference[] | null = null;

export function getReferences(): Reference[] {
  if (cache) return cache;
  const bibPath = join(process.cwd(), 'src/content/bibliography/references.bib');
  const raw = readFileSync(bibPath, 'utf-8');
  const parsed = parseBibtexEntries(raw) as ParsedBibtexEntry[];
  cache = parsed.map((entry) => ({
    key: entry.key,
    type: entry.type,
    author: entry.AUTHOR ?? '',
    title: entry.TITLE ?? '',
    journal: entry.JOURNAL,
    year: entry.YEAR,
    volume: entry.VOLUME,
    number: entry.NUMBER,
    pages: entry.PAGES,
    doi: entry.DOI,
  }));
  return cache;
}

export function getReference(key: string): Reference {
  const ref = getReferences().find((r) => r.key === key);
  if (!ref) {
    throw new Error(`Unknown citation key "${key}" — check src/content/bibliography/references.bib`);
  }
  return ref;
}

function shortAuthors(author: string): string {
  const names = author.split(' and ').map((name) => name.split(',')[0].trim());
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names[0]} et al.`;
}

export function formatShortCitation(ref: Reference): string {
  return `${shortAuthors(ref.author)} (${ref.year})`;
}

export function formatFullCitation(ref: Reference): string {
  const parts = [`${ref.author}.`, `(${ref.year}).`, `${ref.title}.`];
  if (ref.journal) {
    let journalPart = ref.journal;
    if (ref.volume) journalPart += `, ${ref.volume}`;
    if (ref.number) journalPart += `(${ref.number})`;
    if (ref.pages) journalPart += `, ${ref.pages}`;
    parts.push(`${journalPart}.`);
  }
  return parts.join(' ');
}

export function toBibtex(ref: Reference): string {
  const fields: [string, string | number | undefined][] = [
    ['author', ref.author],
    ['title', ref.title],
    ['journal', ref.journal],
    ['year', ref.year],
    ['volume', ref.volume],
    ['number', ref.number],
    ['pages', ref.pages],
    ['doi', ref.doi],
  ];
  const body = fields
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([name, value]) => `  ${name} = {${value}}`)
    .join(',\n');
  return `@${ref.type}{${ref.key},\n${body}\n}`;
}
