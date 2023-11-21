import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import useKeypress from 'react-use-keypress'

const images = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/1.jpeg?1',
  '/images/2.jpeg?1',
  '/images/3.jpeg?1',
  '/images/4.jpeg?1',
  '/images/5.jpeg?1',
  '/images/6.jpeg?1',
  '/images/1.jpeg?2',
  '/images/2.jpeg?2',
  '/images/3.jpeg?2',
  '/images/4.jpeg?2',
  '/images/5.jpeg?2',
  '/images/6.jpeg?2',
]

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const margin = 10
const gap = 2

export default function Page() {
  const [index, setIndex] = useState(0)

  useKeypress('ArrowRight', () => {
    if (index >= images.length - 1) return
    setIndex(index + 1)
  })

  useKeypress('ArrowLeft', () => {
    if (index <= 0) return
    setIndex(index - 1)
  })

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((image, i) => (
                <motion.img
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  key={image}
                  src={image}
                  className="aspect-[3/2] object-cover"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80"
                  onClick={() => {
                    console.log(index - 1)
                    setIndex(index - 1)
                  }}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex h-14 justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{ x: `-${index * 100 * (collapsedAspectRatio / fullAspectRatio) + margin + index * gap}%` }}
              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
              className="flex"
            >
              {images.map((image, i) => (
                <motion.button
                  key={image}
                  onClick={() => setIndex(i)}
                  variants={{
                    active: {
                      aspectRatio: fullAspectRatio,
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                    },
                    inactive: {
                      aspectRatio: collapsedAspectRatio,
                      marginLeft: 0,
                      marginRight: 0,
                      opacity: 0.5,
                    },
                  }}
                  initial={false}
                  animate={i === index ? 'active' : 'inactive'}
                  whileHover={{ opacity: 1 }}
                  transition={{ ease: [0.25, 0.5, 0.75, 1] }}
                  className="shrink-0"
                >
                  <img src={image} className="h-full rounded-sm object-cover" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
