#!/usr/bin/env node
/**
 * Phase 2 — One-time content fetcher (Sefaria → local JSON).
 *
 * Why a script (not page-load): the previous static-HTML attempts called
 * Sefaria from the browser and failed on CORS. Fetching here, server-side /
 * at build time, avoids CORS entirely. The app then reads ONLY the local
 * JSON files this script writes — it never calls Sefaria at runtime.
 *
 * Usage:  node scripts/fetch-sefaria.mjs
 * Output: /data/tehillim.json, /data/mishna.json, /data/torah.json
 *
 * Notes on Sefaria's shape: the Hebrew text ("he") can be a string, an
 * array of verse strings, or an array-of-arrays (chapters → verses). We
 * flatten correctly and strip ALL HTML (spans, <b>, footnotes, nikud-safe).
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const API = 'https://www.sefaria.org/api/texts'
const UA = { 'User-Agent': 'Mozilla/5.0 (TimeToTorah content fetcher)' }

/** Remove every HTML tag / footnote / entity, keep the Hebrew letters + nikud. */
function stripHtml(input) {
  if (input == null) return ''
  let s = String(input)
  s = s.replace(/<sup[^>]*>.*?<\/sup>/gis, '')          // footnote markers
  s = s.replace(/<i[^>]*class="footnote".*?<\/i>/gis, '') // footnote bodies
  s = s.replace(/<[^>]+>/g, '')                            // any remaining tags
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  return s.replace(/\s+/g, ' ').trim()
}

/** Flatten Sefaria "he" into a flat array of clean verse strings. */
function flattenVerses(he) {
  const out = []
  const walk = (node) => {
    if (Array.isArray(node)) node.forEach(walk)
    else if (typeof node === 'string') { const v = stripHtml(node); if (v) out.push(v) }
  }
  walk(he)
  return out
}

async function fetchRef(ref) {
  const res = await fetch(`${API}/${ref}?lang=he&context=0`, { headers: UA })
  if (!res.ok) throw new Error(`${ref} → HTTP ${res.status}`)
  const json = await res.json()
  return flattenVerses(json.he)
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }

async function fetchPsalms() {
  const out = {}
  for (let n = 1; n <= 150; n++) {
    try {
      const verses = await fetchRef(`Psalms.${n}`)
      out[n] = { num: n, verses }
      process.stdout.write(`\rPsalms ${n}/150 (${verses.length} verses)   `)
    } catch (e) {
      console.error(`\nPsalm ${n} failed: ${e.message}`)
    }
    await sleep(300) // be polite to Sefaria
  }
  console.log('')
  return out
}

async function fetchMishnaBerakhot() {
  const out = {}
  for (let ch = 1; ch <= 9; ch++) {
    try {
      out[ch] = { chapter: ch, mishnayot: await fetchRef(`Mishnah_Berakhot.${ch}`) }
      console.log(`Mishnah Berakhot ${ch}`)
    } catch (e) { console.error(`Mishnah ${ch}: ${e.message}`) }
    await sleep(300)
  }
  return out
}

async function fetchTorahGenesis() {
  const out = {}
  for (let ch = 1; ch <= 12; ch++) {
    try {
      out[ch] = { chapter: ch, verses: await fetchRef(`Genesis.${ch}`) }
      console.log(`Genesis ${ch}`)
    } catch (e) { console.error(`Genesis ${ch}: ${e.message}`) }
    await sleep(300)
  }
  return out
}

async function main() {
  await mkdir(DATA_DIR, { recursive: true })
  const tehillim = await fetchPsalms()
  await writeFile(join(DATA_DIR, 'tehillim.json'), JSON.stringify(tehillim, null, 2))
  const mishna = await fetchMishnaBerakhot()
  await writeFile(join(DATA_DIR, 'mishna.json'), JSON.stringify(mishna, null, 2))
  const torah = await fetchTorahGenesis()
  await writeFile(join(DATA_DIR, 'torah.json'), JSON.stringify(torah, null, 2))
  console.log('✅ Wrote data/tehillim.json, data/mishna.json, data/torah.json')
}

main().catch((e) => { console.error(e); process.exit(1) })
