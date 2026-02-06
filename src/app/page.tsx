'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle, Linkedin, MapPin, Github, ExternalLink } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ProfileImage } from "@/components/profile-image"
import { FuturisticBackground } from "@/components/futuristic-background"
import { GlitchText, TypewriterText } from "@/components/animated-text"
import { BubbleCard, BubbleBadge } from "@/components/bubble-card"
import { CircleBubble } from "@/components/circle-bubble"
import { ThemeToggle } from "@/components/theme-toggle"
import { LetterHoverText } from "@/components/letter-hover-text"
import { GmailLogo, WhatsAppLogo, GoogleMapsLogo, LinkedInLogo, PhoneLogo } from "@/components/contact-logos"
import { CodeIcon, LaptopIcon, AIIcon, StarIcon } from "@/components/skill-icons"
import { WordHoverText } from "@/components/word-hover-text"
import { JellyCard } from "@/components/jelly-card"
import { FloatingParticles } from "@/components/floating-particles"
import { FloatingBallsAround } from "@/components/floating-balls-around"
import { FloatingTechIcons } from "@/components/floating-tech-icons"
import { HeroBackgroundImage } from "@/components/hero-background-image"
import { EasterEggButton } from "@/components/easter-egg-button"
import { VideoModal } from "@/components/video-modal"
import { motion } from "framer-motion"

export default function Home() {
  // Audio state management
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [audioErrors, setAudioErrors] = useState<{[key: string]: string | null}>({})
  const audioRefs = useRef<{[key: string]: HTMLAudioElement | null}>({})

  // Video modal state
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const playAudio = async (audioKey: string, filePath: string) => {
    // Initialize audio on first click
    if (!audioRefs.current[audioKey]) {
      audioRefs.current[audioKey] = new Audio(filePath)
      audioRefs.current[audioKey]!.preload = 'auto'
      audioRefs.current[audioKey]!.volume = 0.7
      
      audioRefs.current[audioKey]!.onended = () => {
        setPlayingAudio(null)
      }
      
      audioRefs.current[audioKey]!.onerror = (e) => {
        console.error('Audio error:', e)
        setAudioErrors(prev => ({...prev, [audioKey]: 'Failed to load audio'}))
        setPlayingAudio(null)
      }
    }
    
    const audio = audioRefs.current[audioKey]!
    
    // Stop any currently playing audio
    if (playingAudio && playingAudio !== audioKey) {
      const currentAudio = audioRefs.current[playingAudio]
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }
    }
    
    if (playingAudio === audioKey) {
      // Toggle off
      audio.pause()
      audio.currentTime = 0
      setPlayingAudio(null)
    } else {
      try {
        // Reset error
        setAudioErrors(prev => ({...prev, [audioKey]: null}))
        
        // Load if not loaded
        if (audio.readyState === 0) {
          await audio.load()
        }
        
        // Play audio
        await audio.play()
        setPlayingAudio(audioKey)
      } catch (err) {
        console.error('Playback failed:', err)
        setAudioErrors(prev => ({...prev, [audioKey]: 'Click to play'}))
        setPlayingAudio(null)
        
        // Retry after user interaction
        setTimeout(() => {
          audio.play().then(() => {
            setPlayingAudio(audioKey)
            setAudioErrors(prev => ({...prev, [audioKey]: null}))
          }).catch(() => {})
        }, 100)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SmoothScroll />
      {/* Navigation - Floating without bar */}
      <div className="absolute top-0 left-0 right-0 z-50 py-3 md:py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white drop-shadow-md">OB</h2>
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex gap-3 md:gap-6 text-sm md:text-base">
                <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">About</a>
                <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">Skills</a>
                <a href="#hobbies" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md hidden sm:inline">Hobbies</a>
                <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">Contact</a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <FuturisticBackground />
        <FloatingTechIcons />
        <HeroBackgroundImage />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Left Side - Profile Photo - Smaller on mobile, above name */}
            <motion.div 
              className="flex-shrink-0 order-first md:order-none scale-75 md:scale-100"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProfileImage />
            </motion.div>

            {/* Right Side - Content */}
            <div className="text-center md:text-left flex-grow">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-slate-900 dark:text-white mb-4 md:mb-6 whitespace-normal md:whitespace-nowrap overflow-visible tracking-tight">
                  <LetterHoverText text="OISHIK BISWAS" />
                </h1>
              </motion.div>
              
              <motion.div 
                className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4 md:mb-6 leading-relaxed px-2 md:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <TypewriterText 
                  text="Driven by curiosity and fueled by learning, I'm someone who enjoys breaking problems and rebuilding them into better solutions. I like learning by building real things with Python, AI tools, and web technologies." 
delay={0.1}
                />
              </motion.div>

              <motion.div 
                className="flex gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25" asChild>
                    <a href="mailto:oishikthegreat@gmail.com">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="gap-2 border-2 hover:bg-slate-100 dark:hover:bg-slate-800" asChild>
                    <a href="https://github.com/OishikBiswas123" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Tech Tags */}
              <motion.div 
                className="mt-8 flex flex-wrap justify-center md:justify-start gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                {['Python', 'AI/ML', 'Web Dev', 'Automation'].map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 2.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <BubbleBadge delay={2.5 + index * 0.1}>
                      {tag}
                    </BubbleBadge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-slate-500 dark:text-slate-400">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
                <motion.div 
                  className="w-1.5 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20 relative">
        <FloatingParticles />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
            <WordHoverText text="About Me" />
          </h2>
          <motion.p 
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Curiosity drives me more than titles or labels. I believe consistent effort beats talent in the long run. 
            Always exploring, always improving. I'm passionate about solving complex problems and creating innovative solutions 
            using cutting-edge technologies.
          </motion.p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-6 py-20 relative">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">
            <WordHoverText text="Skills & Expertise" />
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
            <BubbleCard color="blue" delay={0.1}>
              <div className="text-center">
                <div className="mb-1 md:mb-3 text-blue-700 dark:text-blue-300">
                  <CodeIcon className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto" />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-extrabold text-blue-800 dark:text-blue-200 mb-1 md:mb-4 drop-shadow-sm leading-tight">Core Technical<br className="md:hidden"/> Skills</h3>
                <ul className="text-[8px] sm:text-[10px] md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 space-y-0.5 md:space-y-2">
                  <li className="drop-shadow-sm">Python</li>
                  <li className="drop-shadow-sm">AI Tools</li>
                  <li className="drop-shadow-sm hidden sm:block">Prompt Engineering</li>
                  <li className="drop-shadow-sm sm:hidden">Prompts</li>
                  <li className="drop-shadow-sm hidden md:block">API Integration</li>
                  <li className="drop-shadow-sm md:hidden">APIs</li>
                  <li className="drop-shadow-sm hidden sm:block">Automation Scripts</li>
                  <li className="drop-shadow-sm sm:hidden">Automation</li>
                  <li className="drop-shadow-sm">Problem Solving</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="green" delay={0.2}>
              <div className="text-center">
                <div className="mb-1 md:mb-3 text-green-700 dark:text-green-300">
                  <LaptopIcon className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto" />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-extrabold text-green-800 dark:text-green-200 mb-1 md:mb-4 drop-shadow-sm leading-tight">Development<br className="md:hidden"/> Skills</h3>
                <ul className="text-[8px] sm:text-[10px] md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 space-y-0.5 md:space-y-2">
                  <li className="drop-shadow-sm">Web Dev</li>
                  <li className="drop-shadow-sm hidden sm:block">Backend Concepts</li>
                  <li className="drop-shadow-sm sm:hidden">Backend</li>
                  <li className="drop-shadow-sm">Git & GitHub</li>
                  <li className="drop-shadow-sm">Debugging</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="purple" delay={0.3}>
              <div className="text-center">
                <div className="mb-1 md:mb-3 text-purple-700 dark:text-purple-300">
                  <AIIcon className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto" />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-extrabold text-purple-800 dark:text-purple-200 mb-1 md:mb-4 drop-shadow-sm leading-tight">AI &<br className="md:hidden"/> Productivity</h3>
                <ul className="text-[8px] sm:text-[10px] md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 space-y-0.5 md:space-y-2">
                  <li className="drop-shadow-sm">ChatGPT</li>
                  <li className="drop-shadow-sm">Automation</li>
                  <li className="drop-shadow-sm">AI Workflows</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="orange" delay={0.4}>
              <div className="text-center">
                <div className="mb-1 md:mb-3 text-orange-700 dark:text-orange-300">
                  <StarIcon className="w-6 h-6 md:w-10 md:h-10 lg:w-12 lg:h-12 mx-auto" />
                </div>
                <h3 className="text-[10px] sm:text-xs md:text-xl lg:text-2xl font-extrabold text-orange-800 dark:text-orange-200 mb-1 md:mb-4 drop-shadow-sm leading-tight">Professional<br className="md:hidden"/> Skills</h3>
                <ul className="text-[8px] sm:text-[10px] md:text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 space-y-0.5 md:space-y-2">
                  <li className="drop-shadow-sm">Logic</li>
                  <li className="drop-shadow-sm">Self-Learning</li>
                  <li className="drop-shadow-sm hidden sm:block">Attention to Detail</li>
                  <li className="drop-shadow-sm sm:hidden">Detail-Oriented</li>
                  <li className="drop-shadow-sm">Time Mgmt</li>
                  <li className="drop-shadow-sm hidden md:block">Communication</li>
                </ul>
              </div>
            </BubbleCard>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="container mx-auto px-6 py-20 relative">
        <FloatingParticles />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            <WordHoverText text="Hobbies & Interests" />
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            <JellyCard delay={0} color="pink" onClick={() => playAudio('guitar', '/guitar.ogg')}>
              <div className="text-5xl mb-2">🎸</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {playingAudio === 'guitar' ? '🔊 Playing...' : audioErrors['guitar'] || 'Playing Guitar'}
              </p>
              {audioErrors['guitar'] && (
                <p className="text-xs text-red-500 mt-1">Click to play</p>
              )}
            </JellyCard>

            <JellyCard 
              delay={0.1} 
              color="blue"
              onDoubleClick={() => setIsVideoOpen(true)}
            >
              <div className="text-5xl mb-2">🕺</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dancing</p>
              <p className="text-xs text-slate-500 mt-1">Double-click to watch</p>
            </JellyCard>

            <JellyCard delay={0.2} color="purple" onClick={() => playAudio('singing', '/singing.ogg')}>
              <div className="text-5xl mb-2">🎤</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {playingAudio === 'singing' ? '🔊 Playing...' : audioErrors['singing'] || 'Singing'}
              </p>
              {audioErrors['singing'] && (
                <p className="text-xs text-red-500 mt-1">Click to play</p>
              )}
            </JellyCard>

            <JellyCard delay={0.3} color="yellow" onClick={() => playAudio('movies', '/movies.ogg')}>
              <div className="text-5xl mb-2">🎬</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {playingAudio === 'movies' ? '🔊 Playing...' : audioErrors['movies'] || 'Movies & Series'}
              </p>
              {audioErrors['movies'] && (
                <p className="text-xs text-red-500 mt-1">Click to play</p>
              )}
            </JellyCard>

            <JellyCard delay={0.4} color="green" onClick={() => playAudio('beatbox', '/beatbox.ogg')}>
              <div className="text-5xl mb-2">🎵</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {playingAudio === 'beatbox' ? '🔊 Playing...' : audioErrors['beatbox'] || 'Beatboxing'}
              </p>
              {audioErrors['beatbox'] && (
                <p className="text-xs text-red-500 mt-1">Click to play</p>
              )}
            </JellyCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20 relative">
        <FloatingParticles />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">
            <WordHoverText text="Get In Touch" />
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {/* Email */}
            <a href="mailto:oishikthegreat@gmail.com" className="block">
              <JellyCard delay={0} color="blue">
                <GmailLogo className="w-14 h-14 mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">oishikthegreat<br/>@gmail.com</p>
              </JellyCard>
            </a>

            {/* Phone */}
            <a href="tel:+917044952230" className="block">
              <JellyCard delay={0.1} color="green">
                <PhoneLogo className="w-14 h-14 mb-2" />
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">+91 7044952230</p>
              </JellyCard>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/917044952230" target="_blank" rel="noopener noreferrer" className="block">
              <JellyCard delay={0.2} color="cyan">
                <WhatsAppLogo className="w-14 h-14 mb-2" />
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">WhatsApp</p>
              </JellyCard>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/oishik-biswas-1487003aa/" target="_blank" rel="noopener noreferrer" className="block">
              <JellyCard delay={0.3} color="purple">
                <LinkedInLogo className="w-14 h-14 mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">LinkedIn</p>
              </JellyCard>
            </a>

            {/* Location - Last */}
            <a href="https://www.google.com/maps/search/?api=1&query=Kolkata,West+Bengal,India" target="_blank" rel="noopener noreferrer" className="block">
              <JellyCard delay={0.4} color="pink">
                <GoogleMapsLogo className="w-14 h-14 mb-2" />
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">KOLKATA, WB</p>
              </JellyCard>
            </a>
          </div>

          <div className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25" asChild>
                <a href="mailto:oishikthegreat@gmail.com">
                  <Mail className="w-4 h-4" />
                  Send Me an Email
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400">
              © 2024 OISHIK BISWAS. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>

      {/* Easter Egg Button */}
      <EasterEggButton />

      {/* Video Modal for Dancing */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/dancing.mp4"
        title="🕺 Dancing Video"
      />
    </div>
  );
}
