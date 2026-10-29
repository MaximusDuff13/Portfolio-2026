import { Fragment } from 'react'
import type { Employer } from '../content'
import { CompanyMark, Value } from './cards'

/* Where he works and has worked, under the hero's paragraph, as one line in his voice with the
   logos set in it: "Now at … Before that, … and …". Picked Oct 29 2026 from five layouts
   (labels, rail, sentence, row, ledger). */
export function CompanyStrip({ items }: { items: Employer[] }) {
  const now = items.filter((e) => e.current)
  const before = items.filter((e) => !e.current)
  const company = (e: Employer) => (
    <span key={e.id} className="co-inline">
      <CompanyMark name={e.name} logo={e.logo} className="co-inline-mark" />
      <Value value={e.name} />
    </span>
  )
  return (
    <p className="co-sentence">
      Now at {now.map(company)}.{' '}
      {before.length > 0 && (
        <>
          Before that,{' '}
          {before.map((e, i) => (
            <Fragment key={e.id}>
              {i > 0 && (i === before.length - 1 ? ' and ' : ', ')}
              {company(e)}
            </Fragment>
          ))}
          .
        </>
      )}
    </p>
  )
}
