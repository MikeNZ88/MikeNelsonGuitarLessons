#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'app', 'blog');
const OUT_CSV = path.join(ROOT, 'blog_metadata.csv');
const BASE = 'https://mikenelsonguitarlessons.co.nz';

/** Recursively list all blog subdirectories (including root) */
function listBlogDirs(dir) {
  const dirs = [];
  function rec(d) {
    dirs.push(d);
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isDirectory()) rec(path.join(d, ent.name));
    }
  }
  rec(dir);
  return dirs;
}

function readIfExists(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function unescapeJsString(s) {
  if (!s) return s;
  // Handle common escape sequences from TS/JS string literals
  let out = s;
  out = out.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
  out = out.replace(/\\"/g, '"').replace(/\\'/g, "'");
  // Finally collapse escaped backslashes
  out = out.replace(/\\\\/g, '\\');
  return out;
}

/** Extract metadata fields from a TSX file source with a simple, scoped regex */
function extractFromSource(src, onlyMetadata = false) {
  if (!src) return {};
  // Narrow to export const metadata block if present
  const blockMatch = src.match(/export\s+const\s+metadata\s*:\s*[^=]*=\s*\{([\s\S]*?)\};?/);
  if (onlyMetadata && !blockMatch) return {};
  const scope = blockMatch ? blockMatch[1] : src;

  const getQuotedFlexible = (prop) => {
    const patterns = [
      new RegExp('\\b' + prop + '\\s*:\\s*"([\\s\\S]*?)"'),
      new RegExp('\\b' + prop + '\\s*:\\s*\'([\\s\\S]*?)\''),
      new RegExp('\\b' + prop + '\\s*:\\s*`([\\s\\S]*?)`'),
    ];
    for (const re of patterns) {
      const m = scope.match(re);
      if (m && m[1] != null) return m[1].trim();
    }
    return '';
  };

  const title = getQuotedFlexible('title');
  const description = getQuotedFlexible('description');
  const ogImage = (scope.match(/images\s*:\s*\[[\s\S]*?url\s*:\s*(["'`])([\s\S]*?)\1/) || [,'',''])[2].trim();
  const canonical = (scope.match(/alternates\s*:\s*\{[\s\S]*?canonical\s*:\s*(["'`])([\s\S]*?)\1/) || [,'',''])[2].trim();
  const ogUrl = (scope.match(/openGraph\s*:\s*\{[\s\S]*?url\s*:\s*(["'`])([\s\S]*?)\1/) || [,'',''])[2].trim();

  // If ogUrl looks like an image URL, discard it (this prevents matching images[0].url)
  const ogUrlClean = /\.(png|jpe?g|webp|svg)(\?.*)?$/i.test(ogUrl || '') ? '' : ogUrl;

  return { title, description, image: ogImage, canonical, ogUrl: ogUrlClean };
}

function absolutizeUrl(u) {
  if (!u) return '';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  if (!u.startsWith('/')) return `${BASE}/${u}`;
  return `${BASE}${u}`;
}

function buildRow(dir) {
  const pageSrc = readIfExists(path.join(dir, 'page.tsx'));
  const layoutSrc = readIfExists(path.join(dir, 'layout.tsx'));

  const fromPage = extractFromSource(pageSrc, true);
  const fromLayout = extractFromSource(layoutSrc, false);

  // Prefer page values, fallback to layout
  const pick = (k) => (fromPage[k] && fromPage[k].length ? fromPage[k] : (fromLayout[k] || ''));

  const rel = path.relative(BLOG_DIR, dir).replace(/\\/g, '/');
  const slug = rel === '' ? 'blog' : rel;

  const canonical = pick('canonical');
  const ogUrl = pick('ogUrl');
  let title = unescapeJsString(pick('title'));
  let description = unescapeJsString(pick('description'));
  let image = pick('image') || '/social/facebook-cover-universal.png';
  image = absolutizeUrl(image);

  const url = canonical || ogUrl || (slug === 'blog' ? `${BASE}/blog` : `${BASE}/blog/${slug}`);

  return { slug, url, title, description, image };
}

const dirs = listBlogDirs(BLOG_DIR);
const rows = dirs.map(buildRow);

// Write CSV
const headers = ['slug', 'url', 'title', 'description', 'image'];
const csv = [headers.join(','), ...rows.map(r => headers.map(h => {
  const v = (r[h] ?? '').toString().replace(/"/g, '""');
  return `"${v}"`;
}).join(','))].join('\n');

fs.writeFileSync(OUT_CSV, csv, 'utf8');
console.log(`Wrote ${OUT_CSV} with ${rows.length} rows.`);
