import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/lib/data"
import { ProjectGallery } from "@/components/project-gallery"
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-xs">Back</span>
        </Link>

        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-text-muted mb-4">
            {project.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
            {project.title}
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-xs text-text-secondary uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs uppercase tracking-widest text-text-primary hover:bg-white/30 dark:hover:bg-white/20 transition-all"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-xs uppercase tracking-widest text-text-secondary hover:bg-white/10 dark:hover:bg-white/5 hover:text-text-primary transition-all"
            >
              <GitBranch size={14} />
              Source Code
            </a>
          )}
        </div>

        <div className="mt-16 max-w-3xl">
          <p className="text-lg text-text-secondary leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {(project.images.length > 0 || project.videos.length > 0) && (
          <div className="mt-16">
            <ProjectGallery images={project.images} videos={project.videos} />
          </div>
        )}
      </div>
    </div>
  )
}
