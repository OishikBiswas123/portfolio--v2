import { HeroSection } from "@/components/hero-section"
import { StatsStrip } from "@/components/stats-strip"
import { WhatIDo } from "@/components/what-i-do"
import { BeyondScreen } from "@/components/beyond-screen"
import { MyMoviePicks } from "@/components/my-movie-picks"
import { MyMusicPicks } from "@/components/my-music-picks"
import { HobbiesSection } from "@/components/hobbies-section"
import { ContactSection } from "@/components/contact-section"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/data"

export default function Home() {
  return (
    <>
      <HeroSection />

      <StatsStrip />

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

      <WhatIDo />

      <BeyondScreen />

      <MyMoviePicks />

      <MyMusicPicks />

      <HobbiesSection />

      <ContactSection />
    </>
  )
}
