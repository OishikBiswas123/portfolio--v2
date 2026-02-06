'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  title?: string
}

export function VideoModal({ isOpen, onClose, videoSrc, title = 'Video' }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Video playback error:', err)
        setError('Failed to play video. Click to retry.')
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true)
      setError(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Video container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
            <div className="text-white text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading video...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
            <div className="text-white text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null)
                  videoRef.current?.play()
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          controls
          autoPlay
          playsInline
          onLoadedData={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setError('Failed to load video file')
          }}
        />

        {/* Title overlay */}
        <div className="absolute top-4 left-4 right-16 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white font-medium">{title}</p>
        </div>
      </motion.div>

      {/* Instructions */}
      <p className="absolute bottom-4 text-white/60 text-sm">
        Double-click video to toggle fullscreen • Click outside to close
      </p>
    </motion.div>
  )
}
