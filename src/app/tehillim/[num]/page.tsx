import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPsalm, getAllPsalms, hebNum } from '@/lib/content'
import FinishLessonButton from '@/components/FinishLessonButton'

export function generateStaticParams() {
  return getAllPsalms().map((p) => ({ num: String(p.num) }))
}

export default function PsalmPage({ params }: { params: { num: string } }) {
  const num = parseInt(params.num, 10)
  const psalm = getPsalm(num)
  if (!psalm) return notFound()
  return (
    <div className="page active" style={{ direction: 'rtl' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <Link href="/tehillim" style={{ color: '#F0D878', textDecoration: 'none', fontSize: '0.9rem' }}>← חזרה לכל הפרקים</Link>
        <h1 style={{ color: '#F0D878', fontFamily: "'Frank Ruhl Libre',serif", fontSize: '1.9rem', margin: '0.8rem 0 1.2rem' }}>
          תהלים · מזמור {hebNum(num)}
        </h1>
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(240,216,120,0.3)', borderRadius: 10, padding: '1.4rem', fontFamily: "'Frank Ruhl Libre',serif", fontSize: '1.18rem', lineHeight: 2.6, color: '#F0D878', textAlign: 'right' }}>
          {psalm.verses.length ? psalm.verses.map((v, i) => (
            <p key={i} style={{ margin: '0 0 0.4rem' }}>
              <span style={{ color: '#E8D5A3' }}>{hebNum(i + 1)}. </span>{v}
            </p>
          )) : <p>הטקסט יתווסף בקרוב.</p>}
        </div>
        <FinishLessonButton category="tehillim" chapterId={num} nextHref={num < 150 ? `/tehillim/${num + 1}` : undefined} />
      </div>
    </div>
  )
}
