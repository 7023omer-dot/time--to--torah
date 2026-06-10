import Link from 'next/link'
import { getAllParashiot } from '@/lib/content'

export default function ParashaIndex() {
  const list = getAllParashiot()
  return (
    <div className="page active" style={{ direction: 'rtl' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <h1 style={{ color: '#F0D878', fontFamily: "'Frank Ruhl Libre',serif", fontSize: '2rem', marginBottom: '1.2rem' }}>📜 פרשת השבוע</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '0.7rem' }}>
          {list.map((p) => (
            <Link key={p.num} href={`/parasha/${p.num}`}
              style={{ background: 'rgba(45,10,20,0.6)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, padding: '0.9rem', textAlign: 'center', color: '#F0D878', textDecoration: 'none' }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.7, marginTop: 4 }}>{p.chap || 'פרשה'}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
