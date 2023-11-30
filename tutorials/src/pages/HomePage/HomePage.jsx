import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

const links = [
  {
    path: PATH.ANIMATED_NAV,
    label: 'Animated nav – the Vercel dashboard',
    source: 'https://www.youtube.com/watch?v=7iZbqozTxPo&list=PL48itnNww9BJ4fPnX861nr1vxZ6RK7vZB&index=8',
  },
  {
    path: PATH.ANIMATED_TABS,
    label: 'Animated tabs – with inverted text!',
    source: 'https://www.youtube.com/watch?v=9VpDLxWPesI&list=PL48itnNww9BJ4fPnX861nr1vxZ6RK7vZB&index=23',
  },
  {
    path: PATH.CARD_GRADIENT,
    label: 'Animating a radial gradient with Framer Motion',
    source: 'https://www.youtube.com/watch?v=3ByHe9kR3rI&list=PL48itnNww9BJ4fPnX861nr1vxZ6RK7vZB&index=25',
  },
  {
    path: PATH.RESPONSIVE_FRAMER_MOTION,
    label: 'Responsive Framer Motion with Tailwind CSS',
    source: 'https://youtu.be/8eT9g1mkjCs',
  },
]

export default function HomePage() {
  return (
    <div className="p-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li className="flex items-center gap-2" key={link.path}>
            <Link to={link.path} className="text-blue-600 underline">
              {link.label}
            </Link>
            <a href={link.source} target="_blank" className="text-sm text-gray-500 underline" rel="noreferrer">
              (Tutorial video)
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
