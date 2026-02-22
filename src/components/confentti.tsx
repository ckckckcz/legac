"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"

export default function ConfettiAnimation() {
  const [windowDimension, setWindowDimension] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const [showConfetti, setShowConfetti] = useState(true)

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    // Set initial dimensions on mount
    if (typeof window !== "undefined") {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", detectSize)

    // Stop confetti after a few seconds for demonstration
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 10000) // Confetti will stop after 10 seconds

    return () => {
      window.removeEventListener("resize", detectSize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.1}
          initialVelocityX={{ min: -5, max: 5 }}
          initialVelocityY={{ min: 5, max: 15 }}
        />
      )}
    </div>
  )
}