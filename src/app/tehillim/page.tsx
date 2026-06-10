import Link from 'next/link'
import { getAllPsalms, hebNum } from '@/lib/content'

export default function TehillimIndex() {
  const psalms = getAllPsalms()
  return (
    <div className="page active" style={{ direction: 'rtl' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ color: '#F0D878', fontFamily: "'Frank Ruhl Libre',serif", fontSize: '2rem', marginBottom: '0.5rem' }}>📖 תהילים</h1>
        <p style={{ color: '#F0D878', opacity: 0.8, marginBottom: '1.5rem' }}>ספר תהילים המלא — {psalms.filter(p => p.verses.length).length} פרקים עם טקסט מנוקד</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))', gap: '0.7rem' }}>
          {psalms.map((p) => (
            <Link key={p.num} href={`/tehillim/${p.num}`}
              style={{ background: 'rgba(45,10,20,0.6)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, padding: '0.9rem 0.6rem', textAlign: 'center', color: '#F0D878', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>מזמור {hebNum(p.num)}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: 4 }}>{p.verses.length ? `${p.verses.length} פסוקים` : 'בקרוב'}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
