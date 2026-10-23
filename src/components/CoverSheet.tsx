/* NEW — a compact case-file cover sheet: Company, Role, Dates, Scope, Outcome, Read time,
   Audience and Status in a ruled form. Used by the case study covers and entries. Built from
   existing tokens only; a "Draft" status reuses the warning palette as a file stamp. */

export type CoverSheetData = {
  company: string
  role: string
  dates: string
  scope: string
  outcome?: string
  status: string
  readTime: string
  /** B2B / B2C, where relevant */
  audience?: string
}

export function CoverSheet({
  data,
  fileNo,
  id,
  dense = false,
  tone = 'line',
  layout = 'table',
}: {
  data: CoverSheetData
  /** optional file number for the header strip, e.g. '01' */
  fileNo?: string
  id?: string
  /** tighter rows, for overlaying a wall tile */
  dense?: boolean
  /** 'line' = body paper with a hairline border (wall tiles); 'fill' = a foundation-100
      tile with no outer border, for sitting beside an unframed image */
  tone?: 'line' | 'fill'
  /** 'table' = the ruled form (default); 'strip' = the same fields in one wrapping row,
      for a row or a lead story; 'caption' = two lines (company · role, then outcome) */
  layout?: 'table' | 'strip' | 'caption'
}) {
  if (layout === 'strip') return <SheetStrip data={data} id={id} />
  if (layout === 'caption') return <SheetCaption data={data} id={id} />
  const rows: [string, string][] = [
    ['Company', data.company],
    ['Role', data.role],
    ['Dates', data.dates],
    ['Scope', data.scope],
  ]
  if (data.outcome) rows.push(['Outcome', data.outcome])
  rows.push(['Read time', data.readTime])
  if (data.audience) rows.push(['Audience', data.audience])

  const row =`grid grid-cols-[76px_1fr] gap-3 px-3 ${dense ? 'py-1' : 'py-1.5'}`

  return (
    <div
      id={id}
      className={`rounded-sm text-left ${tone === 'fill' ? 'bg-foundation-100' : 'bg-body border border-border'}`}
    >
      <div className="flex items-center justify-between gap-3 px-3 py-2 border-b border-border">
        <p className="text-label font-grotesk uppercase text-foundation-600">
          Cover sheet{fileNo ? ` · File ${fileNo}` : ''}
        </p>
        <div className="w-4 h-px bg-foundation-300" aria-hidden="true" />
      </div>
      <dl className="divide-y divide-border">
        {rows.map(([label, value]) => (
          <div key={label} className={row}>
            <dt className="text-label font-grotesk uppercase text-foundation-600 pt-[3px]">{label}</dt>
            <dd className="text-caption font-sans text-foundation-900">{value}</dd>
          </div>
        ))}
        <div className={`${row} items-center`}>
          <dt className="text-label font-grotesk uppercase text-foundation-600">Status</dt>
          <dd>
            <StatusChip status={data.status} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

/** Draft reuses the warning palette as a file stamp; anything else is a quiet neutral chip */
function StatusChip({ status }: { status: string }) {
  const isDraft = status.toLowerCase() === 'draft'
  return (
    <span
      className={`inline-block px-1.5 py-1 border rounded-sm text-label font-grotesk uppercase ${
        isDraft ? 'bg-warning-fill border-warning-border text-warning-text' : 'bg-foundation-100 border-border text-foundation-700'
      }`}
    >
      {status}
    </span>
  )
}

/* The same fields in one row that wraps (never truncates): label over value, hairlines
   above and below. For an index row or a lead story. */
function SheetStrip({ data, id }: { data: CoverSheetData; id?: string }) {
  const fields: [string, string][] = [
    ['Company', data.company],
    ['Role', data.role],
    ['Dates', data.dates],
    ['Scope', data.scope],
  ]
  if (data.outcome) fields.push(['Outcome', data.outcome])
  return (
    <dl id={id} className="flex flex-wrap gap-x-8 gap-y-4 border-y border-border py-4 m-0">
      {fields.map(([label, value]) => (
        <div key={label} className="flex flex-col gap-1.5 min-w-0">
          <dt className="text-label font-grotesk uppercase text-foundation-600">{label}</dt>
          <dd className="m-0 text-body-sm font-sans text-foundation-900">{value}</dd>
        </div>
      ))}
      <div className="flex flex-col gap-1.5">
        <dt className="text-label font-grotesk uppercase text-foundation-600">Status</dt>
        <dd className="m-0">
          <StatusChip status={data.status} />
        </dd>
      </div>
    </dl>
  )
}

/* Two lines: who and in what role, then the outcome (or scope) and status */
function SheetCaption({ data, id }: { data: CoverSheetData; id?: string }) {
  return (
    <div id={id} className="flex flex-col gap-1.5">
      <p className="m-0 text-body-sm font-grotesk font-medium text-foundation-900">
        {data.company} <span className="text-foundation-600 font-normal">· {data.role}</span>
      </p>
      <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm font-sans text-foundation-700">
        <span>{data.outcome ?? data.scope}</span>
        <StatusChip status={data.status} />
      </p>
    </div>
  )
}
