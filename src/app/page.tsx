'use client'

import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle, Linkedin, MapPin, Github, ExternalLink } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { ProfileImage } from "@/components/profile-image"
import { AnimatedBackground } from "@/components/animated-background"
import { GlitchText, TypewriterText } from "@/components/animated-text"
import { BubbleCard, BubbleBadge } from "@/components/bubble-card"
import { CircleBubble } from "@/components/circle-bubble"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SmoothScroll />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">OB</h2>
            <div className="flex items-center gap-6">
              <div className="flex gap-6">
                <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
                <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Skills</a>
                <a href="#hobbies" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Hobbies</a>
                <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20 min-h-screen flex items-center">
        <AnimatedBackground />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-4 items-center">
            {/* Left Side - Profile Photo */}
            <motion.div 
              className="flex justify-center md:justify-start md:-ml-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProfileImage />
            </motion.div>

            {/* Right Side - Content */}
            <div className="text-center md:text-left md:-ml-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-white mb-6 whitespace-nowrap">
                  <GlitchText text="OISHIK BISWAS" />
                </h1>
              </motion.div>
              
              <motion.div 
                className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed"
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
      <section id="about" className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16">About Me</h2>
          <div className="flex justify-center">
            <BubbleCard color="blue" delay={0}>
              <div className="max-w-[260px]">
                <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  Curiosity drives me more than titles. I believe consistent effort beats talent. Always exploring & improving!
                </p>
              </div>
            </BubbleCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Skills & Expertise</h2>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            <BubbleCard color="blue" delay={0.1}>
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">Core Technical</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-[220px]">
                <BubbleBadge delay={0.2}>Python</BubbleBadge>
                <BubbleBadge delay={0.25}>AI Tools</BubbleBadge>
                <BubbleBadge delay={0.3}>Prompt Eng</BubbleBadge>
                <BubbleBadge delay={0.35}>API</BubbleBadge>
                <BubbleBadge delay={0.4}>Automation</BubbleBadge>
              </div>
            </BubbleCard>

            <BubbleCard color="green" delay={0.15}>
              <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">Development</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-[220px]">
                <BubbleBadge delay={0.3}>Web Dev</BubbleBadge>
                <BubbleBadge delay={0.35}>HTML/CSS/JS</BubbleBadge>
                <BubbleBadge delay={0.4}>Backend</BubbleBadge>
                <BubbleBadge delay={0.45}>Git/GitHub</BubbleBadge>
              </div>
            </BubbleCard>

            <BubbleCard color="purple" delay={0.2}>
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">AI & Tools</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-[220px]">
                <BubbleBadge delay={0.35}>ChatGPT</BubbleBadge>
                <BubbleBadge delay={0.4}>Auto Tools</BubbleBadge>
                <BubbleBadge delay={0.45}>AI Workflow</BubbleBadge>
              </div>
            </BubbleCard>

            <BubbleCard color="orange" delay={0.25}>
              <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">Professional</h3>
              <div className="flex flex-wrap gap-2 justify-center max-w-[220px]">
                <BubbleBadge delay={0.4}>Logic</BubbleBadge>
                <BubbleBadge delay={0.45}>Self-Learn</BubbleBadge>
                <BubbleBadge delay={0.5}>Detail</BubbleBadge>
                <BubbleBadge delay={0.55}>Time Mgmt</BubbleBadge>
              </div>
            </BubbleCard>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Hobbies & Interests</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CircleBubble delay={0} color="pink">
              <div className="text-5xl mb-2">🎸</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Playing Guitar</p>
            </CircleBubble>

            <CircleBubble delay={0.1} color="blue">
              <div className="text-5xl mb-2">🕺</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dancing</p>
            </CircleBubble>

            <CircleBubble delay={0.2} color="purple">
              <div className="text-5xl mb-2">🎤</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Singing</p>
            </CircleBubble>

            <CircleBubble delay={0.3} color="yellow">
              <div className="text-5xl mb-2">🎬</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Movies & Series</p>
            </CircleBubble>

            <CircleBubble delay={0.4} color="green">
              <div className="text-5xl mb-2">🎵</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Beatboxing</p>
            </CircleBubble>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16 text-center">Get In Touch</h2>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-14">
            <BubbleCard color="cyan" delay={0.1}>
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-8 h-8 text-red-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Location</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">KOLKATA, WB</p>
              </div>
            </BubbleCard>

            <BubbleCard color="blue" delay={0.15}>
              <div className="flex flex-col items-center text-center">
                <Mail className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Email</h3>
                <a href="mailto:oishikthegreat@gmail.com" className="text-blue-600 hover:underline text-xs">
                  oishikthegreat@gmail.com
                </a>
              </div>
            </BubbleCard>

            <BubbleCard color="green" delay={0.2}>
              <div className="flex flex-col items-center text-center">
                <Phone className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Phone</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">+91 7044952230</p>
              </div>
            </BubbleCard>

            <BubbleCard color="green" delay={0.25}>
              <div className="flex flex-col items-center text-center">
                <MessageCircle className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">WhatsApp</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">7044952230</p>
              </div>
            </BubbleCard>

            <BubbleCard color="blue" delay={0.3}>
              <div className="flex flex-col items-center text-center">
                <Linkedin className="w-8 h-8 text-blue-700 mb-2" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/oishik-biswas-1487003aa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                >
                  Oishik Biswas
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </BubbleCard>
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
    </div>
  );
}
