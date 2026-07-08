"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { onLenisScroll } from "@/components/smooth-scroll-provider"
import { ContactForm } from "@/components/contact-form"
import { StatusBar } from "@/components/status-bar"
import { Mail, MapPin, Phone, ExternalLink, MessageCircle } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [viewportH, setViewportH] = useState(0)
  const rawProgress = useMotionValue(0)

  useEffect(() => {
    setViewportH(window.innerHeight)
    const onResize = () => setViewportH(window.innerHeight)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    return onLenisScroll((scrollY) => {
      if (!sectionRef.current || !viewportH) return
      const top = sectionRef.current.offsetTop
      const height = sectionRef.current.offsetHeight
      const sectionStart = top - viewportH
      const sectionEnd = top + height
      const progress = Math.max(
        0,
        Math.min(1, (scrollY - sectionStart) / (sectionEnd - sectionStart)),
      )
      rawProgress.set(progress)
    })
  }, [viewportH])

  const smoothProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  })

  const buildScale = useTransform(smoothProgress, [0, 0.5, 1], [0.72, 1, 1.32])
  const buildOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const displayOpacity = useTransform(buildOpacity, (v) => v * 0.13)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 sm:py-32"
    >
      <motion.span
        style={{
          scale: buildScale,
          opacity: displayOpacity,
          letterSpacing: "-0.05em",
        }}
        className="fixed inset-0 flex items-center justify-center text-[25vw] font-black text-text-primary leading-none select-none pointer-events-none z-0"
      >
        build.
      </motion.span>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-tight">
            let&apos;s build <br />
            <span className="text-text-secondary">something that matters.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            Have a project in mind, a crazy idea, or just want to say hi?
            <br className="hidden sm:block" />
            I&apos;m always open to building something cool.
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-8 inline-flex items-center gap-3 text-lg sm:text-xl font-semibold text-text-primary hover:opacity-80 transition-opacity group"
          >
            <Mail size={20} />
            {personalInfo.email}
            <ExternalLink size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </a>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-text-secondary bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:text-text-primary transition-all"
            >
              GitHub ↗
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-text-secondary bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:text-text-primary transition-all"
            >
              LinkedIn ↗
            </a>
            <a
              href={personalInfo.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-text-secondary bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:text-text-primary transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-text-secondary bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/20 dark:hover:bg-white/10 hover:text-text-primary transition-all"
            >
              <Phone size={16} />
              Call
            </a>
          </div>

          <div className="mt-10">
            <StatusBar />
          </div>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row gap-12">
          <div className="p-8 sm:p-10 rounded-2xl border border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-xl flex-1 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-8">
              Send a message
            </h3>
            <ContactForm />
          </div>

          <div className="lg:pt-14">
            <h4 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-6">
              Contact Info
            </h4>
            <div className="space-y-5">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail size={16} className="shrink-0 text-text-muted" />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <Phone size={16} className="shrink-0 text-text-muted" />
                <span>{personalInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin size={16} className="shrink-0 mt-0.5 text-text-muted" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
