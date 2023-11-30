import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import useMeasure from 'react-use-measure'

const transition = { type: 'spring', bounce: 0, duration: 0.25 }

const variants = {
  enter: (direction) => ({ x: `${100 * direction}%`, opacity: 0 }),
  middle: { x: '0%', opacity: 1 },
  exit: (direction) => ({ x: `${-100 * direction}%`, opacity: 0 }),
}

const removeImmediately = { exit: { visibility: 'hidden' } }

export default function Page() {
  const [monthString, setMonthString] = useState(format(new Date(), 'yyyy-MM'))
  const [direction, setDirection] = useState()
  const [isAnimating, setIsAnimating] = useState(false)
  const month = parse(monthString, 'yyyy-MM', new Date())

  function nextMonth() {
    if (isAnimating) return

    const next = addMonths(month, 1)

    setMonthString(format(next, 'yyyy-MM'))
    setDirection(1)
    setIsAnimating(true)
  }

  function previousMonth() {
    if (isAnimating) return

    const previous = subMonths(month, 1)

    setMonthString(format(previous, 'yyyy-MM'))
    setDirection(-1)
    setIsAnimating(true)
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  })

  return (
    <MotionConfig transition={transition}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div initial="enter" animate="middle" exit="exit" key={monthString}>
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        custom={direction}
                        variants={variants}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, 'MMMM yyyy')}
                      </motion.p>
                      <motion.button
                        variants={removeImmediately}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.div
                        variants={removeImmediately}
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)',
                        }}
                      ></motion.div>
                    </header>

                    {/* Days of the week */}
                    <motion.div variants={removeImmediately} className="mt-6 grid grid-cols-7 gap-y-6 px-8">
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                      <span className="font-medium text-stone-500">Su</span>
                    </motion.div>

                    {/* Calendar main */}
                    <motion.div custom={direction} variants={variants} className="mt-6 grid grid-cols-7 gap-y-6 px-8">
                      {days.map((day) => {
                        return (
                          <span
                            key={format(day, 'yyyy-MM-dd')}
                            className={`${isSameMonth(day, month) ? '' : 'text-stone-300'} font-semibold`}
                          >
                            {format(day, 'd')}
                          </span>
                        )
                      })}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

function ResizablePanel({ children }) {
  const [ref, { height }] = useMeasure()

  return (
    <motion.div
      animate={{ height: height > 0 ? height : null }}
      transition={{ type: 'spring', stiffness: 100, damping: 14, duration: 0.5 }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}
