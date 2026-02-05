'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const techWords = [
  'AI', 'Python', 'Code', 'Tech', 'Innovation', 'Future', 'Data', 'Cloud',
  'React', 'Node.js', 'API', 'Automation', 'ML', 'Web', 'Dev', 'Software',
  'Algorithm', 'Database', 'Server', 'Client', 'Frontend', 'Backend', 'Fullstack',
  'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Git', 'GitHub', 'Deploy',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'Terminal', 'Script',
  'JSON', 'REST', 'GraphQL', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
  'Redis', 'Nginx', 'Apache', 'SSL', 'HTTP', 'WebSocket', 'Microservices',
  'Agile', 'Scrum', 'DevOps', 'CI/CD', 'Testing', 'Debug', 'Optimize',
  'Scalable', 'Secure', 'Fast', 'Modern', 'Clean', 'Architecture', 'Pattern',
  'Framework', 'Library', 'Component', 'Module', 'Package', 'Dependency',
  'Compile', 'Build', 'Bundle', 'Transpile', 'Minify', 'Cache', 'Cookie',
  'Session', 'Token', 'OAuth', 'JWT', 'Auth', 'Encrypt', 'Hash', 'Parse',
  'Render', 'DOM', 'Virtual', 'State', 'Props', 'Hook', 'Context', 'Redux',
  'Router', 'Navigation', 'Route', 'Link', 'Form', 'Input', 'Validation',
  'Event', 'Listener', 'Callback', 'Promise', 'Async', 'Await', 'Fetch',
  'Axios', 'Request', 'Response', 'Header', 'Body', 'Query', 'Param',
  'Filter', 'Sort', 'Search', 'Pagination', 'Infinite', 'Scroll', 'Load',
  'Lazy', 'Dynamic', 'Static', 'SSR', 'CSR', 'SPA', 'PWA', 'AMP',
  'Responsive', 'Mobile', 'Desktop', 'Tablet', 'Touch', 'Gesture', 'Swipe',
  'Animation', 'Transition', 'Transform', 'Keyframe', 'Bezier', 'Easing',
  'Gradient', 'Shadow', 'Blur', 'Opacity', 'Z-index', 'Flex', 'Grid',
  'Container', 'Wrapper', 'Layout', 'Spacing', 'Margin', 'Padding', 'Border',
  'Radius', 'Width', 'Height', 'Position', 'Display', 'Overflow', 'Float',
  'Clear', 'Block', 'Inline', 'Center', 'Align', 'Justify', 'Gap',
]

interface WordParticle {
  id: number
  text: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingTechWords() {
  const [words, setWords] = useState<WordParticle[]>([])

  useEffect(() => {
    const shuffled = [...techWords].sort(() => 0.5 - Math.random())
    const selectedWords = shuffled.slice(0, 40)
    
    const wordParticles = selectedWords.map((text, index) => ({
      id: index,
      text,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.6,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.08,
    }))
    
    setWords(wordParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {words.map((word) => (
        <motion.div
          key={word.id}
          className="absolute font-mono font-bold text-slate-900 dark:text-slate-300 select-none"
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            fontSize: `${word.size}rem`,
            opacity: word.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 10 - 5, 0],
            opacity: [word.opacity, word.opacity + 0.1, word.opacity],
          }}
          transition={{
            duration: word.duration,
            repeat: Infinity,
            delay: word.delay,
            ease: "easeInOut",
          }}
        >
          {word.text}
        </motion.div>
      ))}
    </div>
  )
}
