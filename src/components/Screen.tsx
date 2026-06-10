// Renders a live-site screen markup verbatim (Phase 1, static data).
export default function Screen({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
