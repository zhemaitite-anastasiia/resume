'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Types out `full` one character at a time. Restarts whenever `full` or
 * `resetKey` changes (e.g. when a new slide becomes active).
 */
export function useTypewriter(full: string, resetKey: unknown, speed = 14) {
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setText('')
    setDone(false)
    let i = 0

    const tick = () => {
      i += 1
      setText(full.slice(0, i))
      if (i >= full.length) {
        setDone(true)
        return
      }
      raf.current = setTimeout(tick, speed)
    }

    raf.current = setTimeout(tick, 250)
    return () => {
      if (raf.current) clearTimeout(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, resetKey])

  return { text, done }
}
