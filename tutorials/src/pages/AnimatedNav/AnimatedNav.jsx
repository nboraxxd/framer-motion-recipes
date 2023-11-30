import { useState } from 'react'
// Please activate the 2 css files below for practice
// import './reset.css'
// import './styles.css'

export default function AnimatedNav() {
  const [hoveredNavItem, setHoveredNavItem] = useState(null)

  return (
    <nav onMouseLeave={() => setHoveredNavItem(null)}>
      <ul>
        {LINKS.map(({ slug, label, href }) => (
          <li key={slug}>
            {hoveredNavItem === slug && <div className="hovered-backdrop" />}

            <a href={href} onMouseEnter={() => setHoveredNavItem(slug)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const LINKS = [
  {
    slug: 'home',
    label: 'Home',
    href: '/',
  },
  {
    slug: 'usage',
    label: 'Usage',
    href: '/usage',
  },
  {
    slug: 'integrations',
    label: 'Integrations',
    href: '/integrations',
  },
]
