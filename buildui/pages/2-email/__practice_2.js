import { useState } from 'react'
import * as Icons from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const titles = [
  ["Apple's newest iPhone is here", 'Watch our July event'],
  ["Nintendo's Newsletter for July", 'Introducing Strike, a 5-on-5 soccer game'],
  ['Your funds have been processed', 'See your latest deposit online'],
  ['This Week in Sports', 'The finals are heating up'],
  ['Changelog update', 'Edge subroutines and more'],
  ['React Hawaii is here!', 'Time for fun in the sun'],
]

export default function Email() {
  // [...Array(9).keys()] tạo ra array từ 0 đến 8
  const [messages, setMessages] = useState([...Array(9).keys()])
  const [selectedMessages, setSelectedMessages] = useState([])

  function addMessage() {
    // lấy item cuối cùng của messages hoặc là 0 (nếu messages rỗng) rồi cộng 1
    const newId = (messages.at(-1) || 0) + 1
    setMessages((messages) => [...messages, newId])
  }

  function archiveSelectedMessages() {
    setMessages((messages) => messages.filter((id) => !selectedMessages.includes(id)))
    setSelectedMessages([])
  }

  function toggleMessage(messageId) {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages((messages) => messages.filter((id) => id !== messageId))
    } else {
      setSelectedMessages((messages) => [...messages, messageId])
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white ">
        <div className="flex w-[45%] flex-col bg-slate-50 py-2">
          <div className="border-b px-5">
            <div className="flex justify-between py-2 text-right">
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <Icons.MailIcon className="h-5 w-5 " />
              </button>
              <button
                onClick={archiveSelectedMessages}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <Icons.ArchiveIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2">
            {/* [...messages].reverse() vì reverse không trả ra mảng mới mà thay đổi trực tiếp trong mảng cũ nên phải tạo ra arr mới */}
            <AnimatePresence initial={false}>
              {[...messages].reverse().map((messageId) => (
                <motion.li
                  key={messageId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ opacity: { duration: 0.2 } }}
                  className="relative"
                >
                  <div className="py-0.5">
                    <button
                      onClick={() => toggleMessage(messageId)}
                      className={clsx(
                        'block w-full cursor-pointer truncate rounded py-3 px-3 text-left transition-all',
                        { 'bg-blue-500': selectedMessages.includes(messageId) },
                        { 'hover:bg-slate-200': !selectedMessages.includes(messageId) }
                      )}
                    >
                      <p
                        className={twMerge(
                          clsx('truncate text-sm font-medium text-slate-500', {
                            'text-white': selectedMessages.includes(messageId),
                          })
                        )}
                      >
                        {titles[messageId % titles.length][0]}
                      </p>
                      <p
                        className={twMerge(
                          clsx('truncate text-xs text-slate-400', {
                            'text-blue-200': selectedMessages.includes(messageId),
                          })
                        )}
                      >
                        {titles[messageId % titles.length][1]}
                      </p>
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        {/* Start Message Skeleton */}
        <div className="flex-1 overflow-y-scroll border-l px-8 py-8">
          <h1 className="h-8 rounded bg-slate-100 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(9).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-100" />
                <p className="h-4 rounded bg-slate-100" />
                <p className="h-4 w-4/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
        {/* End Message Skeleton */}
      </div>
    </div>
  )
}
