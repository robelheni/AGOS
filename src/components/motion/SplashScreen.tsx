'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [exiting, setExiting] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const exitDelay = reduceMotion ? 300 : 950
    const hiddenDelay = reduceMotion ? 500 : 1450

    const exitTimer = window.setTimeout(() => setExiting(true), exitDelay)
    const hiddenTimer = window.setTimeout(() => setHidden(true), hiddenDelay)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(hiddenTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className={`splash-screen${exiting ? ' splash-screen--exit' : ''}`}
      aria-hidden="true"
    >
      <div className="splash-screen__logo-wrap">
        <Image
          src="/images/agos/Logo2.jpg"
          alt=""
          width={1536}
          height={1024}
          priority
          className="splash-screen__logo"
        />
      </div>
      <div className="splash-screen__accent" aria-hidden="true">
        <span className="splash-screen__accent-band splash-screen__accent-band--black" />
        <span className="splash-screen__accent-band splash-screen__accent-band--yellow" />
        <span className="splash-screen__accent-band splash-screen__accent-band--pink" />
        <span className="splash-screen__accent-band splash-screen__accent-band--blue" />
      </div>
    </div>
  )
}
