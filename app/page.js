'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const ConfettiExplosion = dynamic(() => import('../components/ConfettiExplosion'), { ssr: false })

const FlyingEmoji = ({ emoji }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      })
    }
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <motion.div
      className="absolute text-4xl sm:text-5xl md:text-6xl"
      initial={{ x: position.x, y: position.y, scale: 0 }}
      animate={{
        x: [position.x, position.x + 100, position.x - 100],
        y: [position.y, position.y - 100, position.y + 100],
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0],
      }}
      transition={{
        duration: Math.random() * 20 + 10,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {emoji}
    </motion.div>
  )
}

const CelebrationContent = () => {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "Sabash Kachra Sabash"
  const emojis = ['🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍩', '🍪', '🐱', '😺', '😸', '😻', '😽', '🎉', '🎊', '🎈', '🎂', '🍰', '🍾', '🥂', '🍻', '🍷', '🍸', '🍹', '🌟', '✨', '💫', '⭐', '🌠', '🎇', '🎆', '🏆', '🥇', '🏅', '🎖️']

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
    <>
      <ConfettiExplosion />
      {Array.from({ length: 50 }).map((_, index) => (
        <FlyingEmoji key={index} emoji={emojis[Math.floor(Math.random() * emojis.length)]} />
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
    </>
  )
}

export default function CelebrationPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-yellow-300">
      {isMounted && <CelebrationContent />}
    </div>
  )
}