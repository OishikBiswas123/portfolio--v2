'use client'

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
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SmoothScroll />
      {/* Navigation - Floating without bar */}
      <div className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white drop-shadow-md">OB</h2>
            <div className="flex items-center gap-6">
              <div className="flex gap-6">
                <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">About</a>
                <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">Skills</a>
                <a href="#hobbies" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors drop-shadow-md">Hobbies</a>
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
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Left Side - Profile Photo */}
            <motion.div 
              className="flex-shrink-0"
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
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold text-slate-900 dark:text-white mb-6 whitespace-nowrap overflow-visible tracking-tight">
                  <LetterHoverText text="OISHIK BISWAS" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <BubbleCard color="blue" delay={0.1}>
              <div className="text-center">
                <div className="mb-3 text-blue-700 dark:text-blue-300">
                  <CodeIcon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-extrabold text-blue-800 dark:text-blue-200 mb-4 drop-shadow-sm">Core Technical Skills</h3>
                <ul className="text-base font-bold text-slate-800 dark:text-slate-200 space-y-2">
                  <li className="drop-shadow-sm">Python Programming</li>
                  <li className="drop-shadow-sm">AI Tools & Applications</li>
                  <li className="drop-shadow-sm">Prompt Engineering</li>
                  <li className="drop-shadow-sm">API Integration</li>
                  <li className="drop-shadow-sm">Automation Scripts</li>
                  <li className="drop-shadow-sm">Problem Solving</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="green" delay={0.2}>
              <div className="text-center">
                <div className="mb-3 text-green-700 dark:text-green-300">
                  <LaptopIcon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-extrabold text-green-800 dark:text-green-200 mb-4 drop-shadow-sm">Development & Tech Skills</h3>
                <ul className="text-base font-bold text-slate-800 dark:text-slate-200 space-y-2">
                  <li className="drop-shadow-sm">Web Development (HTML, CSS, JavaScript)</li>
                  <li className="drop-shadow-sm">Basic Backend Concepts</li>
                  <li className="drop-shadow-sm">Git & GitHub</li>
                  <li className="drop-shadow-sm">Debugging & Code Optimization</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="purple" delay={0.3}>
              <div className="text-center">
                <div className="mb-3 text-purple-700 dark:text-purple-300">
                  <AIIcon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-extrabold text-purple-800 dark:text-purple-200 mb-4 drop-shadow-sm">AI & Productivity Tools</h3>
                <ul className="text-base font-bold text-slate-800 dark:text-slate-200 space-y-2">
                  <li className="drop-shadow-sm">ChatGPT & AI Assistants</li>
                  <li className="drop-shadow-sm">Content Automation Tools</li>
                  <li className="drop-shadow-sm">AI-Based Workflows</li>
                </ul>
              </div>
            </BubbleCard>

            <BubbleCard color="orange" delay={0.4}>
              <div className="text-center">
                <div className="mb-3 text-orange-700 dark:text-orange-300">
                  <StarIcon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-extrabold text-orange-800 dark:text-orange-200 mb-4 drop-shadow-sm">Professional Skills</h3>
                <ul className="text-base font-bold text-slate-800 dark:text-slate-200 space-y-2">
                  <li className="drop-shadow-sm">Logical Thinking</li>
                  <li className="drop-shadow-sm">Self-Learning</li>
                  <li className="drop-shadow-sm">Attention to Detail</li>
                  <li className="drop-shadow-sm">Time Management</li>
                  <li className="drop-shadow-sm">Communication Skills</li>
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
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <JellyCard delay={0} color="pink">
              <div className="text-5xl mb-2">🎸</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Playing Guitar</p>
            </JellyCard>

            <JellyCard delay={0.1} color="blue">
              <div className="text-5xl mb-2">🕺</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Dancing</p>
            </JellyCard>

            <JellyCard delay={0.2} color="purple">
              <div className="text-5xl mb-2">🎤</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Singing</p>
            </JellyCard>

            <JellyCard delay={0.3} color="yellow">
              <div className="text-5xl mb-2">🎬</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Movies & Series</p>
            </JellyCard>

            <JellyCard delay={0.4} color="green">
              <div className="text-5xl mb-2">🎵</div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Beatboxing</p>
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
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
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
    </div>
  );
}
