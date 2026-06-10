import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getParasha, getAllParashiot } from '@/lib/content'

export function generateStaticParams() {
  return getAllParashiot().map((p) => ({ num: String(p.num) }))
}

export default function ParashaPage({ params }: { params: { num: string } }) {
  const p = getParasha(parseInt(params.num, 10))
  if (!p) return notFound()
  return (
    <div className="page active" style={{ direction: 'rtl' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <Link href="/parasha" style={{ color: '#F0D878', textDecoration: 'none', fontSize: '0.9rem' }}>← כל הפרשות</Link>
        <h1 style={{ color: '#F0D878', fontFamily: "'Frank Ruhl Libre',serif", fontSize: '1.9rem', margin: '0.8rem 0 0.3rem' }}>פרשת {p.name}</h1>
        <div style={{ color: '#F0D878', opacity: 0.75, marginBottom: '1.2rem' }}>{p.chap}</div>
        <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(240,216,120,0.25)', borderRadius: 10, padding: '1.4rem', color: '#F0D878', lineHeight: 2, textAlign: 'right' }}
          dangerouslySetInnerHTML={{ __html: p.html || `<p>${p.text}</p>` }} />
      </div>
    </div>
  )
}
