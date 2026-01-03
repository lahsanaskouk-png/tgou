'use client'
import { motion } from 'framer-motion'

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-gray-900/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 p-8"
    >
      {children}
    </motion.div>
  )
}
