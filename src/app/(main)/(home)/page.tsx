"use client"

import { useState } from "react"
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
  const [spotifyResetKey, setSpotifyResetKey] = useState(0)
  const [hobbyStopKey, setHobbyStopKey] = useState(0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Oishik Biswas",
            url: "https://oishikbiswas.vercel.app",
            image: "https://oishikbiswas.vercel.app/profile.jpg",
            sameAs: [
              "https://github.com/OishikBiswas123",
              "https://www.linkedin.com/in/oishik-biswas-1487003aa/",
            ],
            jobTitle: "Software Engineer",
            description: "Web developer, app developer, game developer, product designer, and AI enthusiast",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolkata",
              addressRegion: "West Bengal",
              addressCountry: "India",
            },
            email: "oishikthegreat@gmail.com",
            telephone: "+917044952230",
          }),
        }}
      />
      <HeroSection />

      <StatsStrip />

      <section id="projects" className="scroll-mt-20">
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

      <MyMusicPicks
        resetKey={spotifyResetKey}
        onTrackChange={() => setHobbyStopKey(k => k + 1)}
      />

      <HobbiesSection
        stopKey={hobbyStopKey}
        onPlay={() => setSpotifyResetKey(k => k + 1)}
      />

      <ContactSection />
    </>
  )
}
