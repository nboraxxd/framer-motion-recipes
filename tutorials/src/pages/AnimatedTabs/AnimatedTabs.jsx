import clsx from 'clsx'
import { useState } from 'react'

let tabs = [
  { id: 'world', label: 'World' },
  { id: 'ny', label: 'N.Y.' },
  { id: 'business', label: 'Business' },
  { id: 'arts', label: 'Arts' },
  { id: 'science', label: 'Science' },
]

export default function AnimatedTabs() {
  let [activeTab, setActiveTab] = useState(tabs[0].id)

  return (
    <div className="flex h-screen items-center justify-center space-x-1 bg-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={clsx(
            'relative rounded-full px-3 py-1.5 text-lg text-white outline-sky-400 transition focus-visible:outline-2',
            { 'hover:text-white/60': activeTab !== tab.id }
          )}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {activeTab === tab.id && (
            <span className="absolute inset-0 z-10 rounded-full bg-white mix-blend-difference" />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  )
}
