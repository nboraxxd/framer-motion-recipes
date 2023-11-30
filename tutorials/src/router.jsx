import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { HomePage } from '@/pages/HomePage'
import { AnimatedNav } from '@/pages/AnimatedNav'
import { AnimatedTabs } from '@/pages/AnimatedTabs'
import { CardGradient } from '@/pages/CardGradient'
import { Responsive } from '@/pages/Responsive'

export const router = createBrowserRouter([
  {
    path: PATH.HOME_PAGE,
    element: <HomePage />,
    errorElement: <div>404</div>,
  },
  {
    path: PATH.ANIMATED_NAV,
    element: <AnimatedNav />,
  },
  {
    path: PATH.ANIMATED_TABS,
    element: <AnimatedTabs />,
  },
  {
    path: PATH.CARD_GRADIENT,
    element: <CardGradient />,
  },
  {
    path: PATH.RESPONSIVE_FRAMER_MOTION,
    element: <Responsive />,
  },
])
