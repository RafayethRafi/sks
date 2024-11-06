"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const FlyingEmoji = ({ emoji }) => (
  <motion.div
    className="absolute text-4xl sm:text-5xl md:text-6xl"
    initial={{ 
      x: Math.random() < 0.5 ? -100 : window.innerWidth + 100, 
      y: Math.random() * window.innerHeight 
    }}
    animate={{
      x: Math.random() < 0.5 ? window.innerWidth + 100 : -100,
      y: Math.random() * window.innerHeight,
    }}
    transition={{
      duration: Math.random() * 10 + 5,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  >
    {emoji}
  </motion.div>
)

const ConfettiExplosion = () => {
  useEffect(() => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: ['#FFD700', '#FFA500', '#FFFF00'] }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }))
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }))
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return null
}

export default function CelebrationPage() {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "Sabash Kachra Sabash"
  const emojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍪', '🐱', '😺', '😸', '😻', '😽', '🎉', '🎊', '🎈', '🎂', '🍰', '🍾', '🥂', '🍻', '🍷', '🍸', '🍹']

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < fullText.length) {
          index++
          return fullText.slice(0, index)
        }
        clearInterval(interval)
        return prev
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-yellow-300">
      <ConfettiExplosion />
      {emojis.map((emoji, index) => (
        <FlyingEmoji key={index} emoji={emoji} />
      ))}
      <AnimatePresence>
        {displayedText.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold inline-block
              ${letter === ' ' ? 'mx-4' : 'mx-[-0.05em]'}`}
            style={{
              color: '#8B4513',
              textShadow: '3px 3px 0 #FFD700, -3px -3px 0 #FFD700, 3px -3px 0 #FFD700, -3px 3px 0 #FFD700, 0 0 20px rgba(255, 215, 0, 0.7)',
              fontFamily: '"Bangers", cursive',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}