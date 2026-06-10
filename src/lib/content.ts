import tehillim from '../../data/tehillim.json'

export type Psalm = { num: number; verses: string[] }
type TehillimMap = Record<string, Psalm>

const PSALMS = tehillim as unknown as TehillimMap

export function getPsalm(num: number): Psalm | null {
  return PSALMS[String(num)] ?? null
}

export function getAllPsalms(): Psalm[] {
  return Object.values(PSALMS).sort((a, b) => a.num - b.num)
}

// Hebrew-letter numbering (1 → א, 15 → טו, 130 → קל)
export function hebNum(n: number): string {
  const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט']
  const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ']
  const hundreds = ['', 'ק', 'ר', 'ש', 'ת']
  if (n <= 0) return String(n)
  const h = Math.floor(n / 100), rem = n % 100
  if (rem === 15) return hundreds[h] + 'טו'
  if (rem === 16) return hundreds[h] + 'טז'
  return hundreds[h] + tens[Math.floor(rem / 10)] + ones[rem % 10]
}

// ─── Parashiot ───────────────────────────────────────────────
import parashiotData from '../../data/parashiot.json'

export type Parasha = { num: number; name: string; chap: string; text: string; html: string }
const PARASHIOT = parashiotData as unknown as Record<string, Parasha>

export function getParasha(num: number): Parasha | null {
  return PARASHIOT[String(num)] ?? null
}
export function getAllParashiot(): Parasha[] {
  return Object.values(PARASHIOT).sort((a, b) => a.num - b.num)
}
