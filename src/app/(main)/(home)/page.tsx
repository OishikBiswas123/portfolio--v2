import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/contact-form"
import { StatusBar } from "@/components/status-bar"
import { ProjectCard } from "@/components/project-card"
import { projects, personalInfo } from "@/lib/data"
import { Mail, MapPin, Phone, ExternalLink, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="projects">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted">
              Completed Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      <AboutSection />


      <section id="contact">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
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

          <div className="mt-20 p-8 sm:p-10 rounded-2xl border border-border-light bg-bg-muted/40 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-8">
              Send a message
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
              <div className="lg:col-span-2">
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
        </div>
      </section>
    </>
  )
}
