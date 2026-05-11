'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const TOP_20 = [
  { category: 'Patron Saints', fact: 'England: St George · 23 April · Rose', stars: '⭐⭐⭐' },
  { category: 'Patron Saints', fact: 'Scotland: St Andrew · 30 November · Thistle', stars: '⭐⭐⭐' },
  { category: 'Patron Saints', fact: 'Wales: St David · 1 March · Daffodil', stars: '⭐⭐⭐' },
  { category: 'Patron Saints', fact: 'Northern Ireland: St Patrick · 17 March · Shamrock', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1066 — Battle of Hastings. William the Conqueror becomes king', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1215 — Magna Carta signed by King John', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1707 — Act of Union — England + Scotland = Great Britain', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1918 — Women over 30 (with property) get the vote', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1928 — All women over 21 get equal voting rights', stars: '⭐⭐⭐' },
  { category: 'Key Date', fact: '1948 — NHS founded + Empire Windrush arrives', stars: '⭐⭐⭐' },
  { category: 'Invention', fact: 'Tim Berners-Lee — invented the World Wide Web (1989)', stars: '⭐⭐⭐' },
  { category: 'Invention', fact: 'Alexander Fleming — discovered penicillin (1928)', stars: '⭐⭐⭐' },
  { category: 'Invention', fact: 'Alexander Graham Bell — invented the telephone (1876)', stars: '⭐⭐⭐' },
  { category: 'Number', fact: '650 — MPs in the House of Commons', stars: '⭐⭐⭐' },
  { category: 'Number', fact: '18/24 = 75% — pass mark for the Life in the UK test', stars: '⭐⭐⭐' },
  { category: 'Number', fact: '12 — members of a jury in a Crown Court', stars: '⭐⭐' },
  { category: 'People', fact: 'Florence Nightingale — nursing pioneer, Crimean War', stars: '⭐⭐⭐' },
  { category: 'People', fact: 'Emmeline Pankhurst — leader of the suffragette movement', stars: '⭐⭐' },
  { category: 'Key Date', fact: '1999 — Devolution: Scottish Parliament, Welsh Senedd, NI Assembly', stars: '⭐⭐' },
  { category: 'Sport', fact: 'Cricket: originated in England. First test match: England vs Australia 1877', stars: '⭐⭐' },
]

export default function NightBeforeSection() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink flex items-center gap-2">
            🌙 Night-Before Quick Revision
          </p>
          <p className="text-sm text-ink-muted mt-0.5">Top 20 most tested facts — tap to expand</p>
        </div>
        <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
          <span className="text-xs text-amber-400 font-medium">{open ? 'Close' : 'Expand'}</span>
          {open ? <ChevronUp size={16} className="text-amber-400" /> : <ChevronDown size={16} className="text-amber-400" />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          {TOP_20.map((item, i) => (
            <div key={i} className="bg-card rounded-xl p-3 flex items-start gap-3">
              <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5">{item.category}</span>
              <span className="text-sm text-ink flex-1">{item.fact}</span>
              <span className="text-xs flex-shrink-0">{item.stars}</span>
            </div>
          ))}
          <p className="text-xs text-ink-muted text-center pt-2">⭐⭐⭐ = appears on almost every test</p>
        </div>
      )}
    </div>
  )
}
