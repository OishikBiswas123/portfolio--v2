import Image from "next/image"
import { ResumeButton } from "@/components/resume-button"
import { SkillBadge } from "@/components/skill-badge"
import { skills, personalInfo } from "@/lib/data"

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-6">
          About
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border-light shrink-0">
                <Image
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {personalInfo.name}
                </h2>
                <p className="text-sm text-text-muted uppercase tracking-widest mt-1">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <div className="text-text-primary leading-relaxed space-y-5">
              <p className="text-base">
                I&apos;m a self-taught product builder who takes ideas from concept
                to live deployment — across mobile apps, web platforms, and
                games. I own the full cycle: product design, UI/UX, frontend and
                backend development, publishing on app stores, custom domain
                setup with hosting, SEO optimization, and Google Business
                profile creation. Every project gets treated like a real product
                — planned, built, and delivered end-to-end.
              </p>
              <p className="text-base">
                I build Android apps with real-time features and secure
                authentication, develop and publish games using Unity, and
                create responsive websites with clean interfaces backed by solid
                server-side logic. I work with databases, APIs, real-time data
                sync, and server deployment. On the creative side, I design
                UI/UX, create brand identities, edit videos, and work in
                Photoshop — handling both the visual and technical sides of a
                product.
              </p>
              <p className="text-base">
                I use modern AI tools to build faster and ship cleaner work,
                while continuously learning through Google AI, Anthropic, OpenAI
                Academy, AWS Skill Builder, and DeepLearning.AI. I&apos;m actively
                exploring cybersecurity and ethical hacking. Beyond building, I
                bring project management, client communication, and a
                product-minded approach to everything I do — the kind of person
                who doesn&apos;t just write code, but ships products that work.
              </p>
            </div>

            <div className="mt-8">
              <ResumeButton />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-6">
              What I Do
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <SkillBadge key={skill} name={skill} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-border-light pt-16">
          <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-10">
            Education
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  B.Tech in Electronics and Communication Engineering
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Kalyani Government Engineering College (MAKAUT)
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-text-muted">2023</p>
                <p className="text-sm font-medium text-text-primary">
                  CGPA: 8.04
                </p>
              </div>
            </div>
            <div className="h-px bg-border-light" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Class XII (CBSE)
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Central Model School
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Maths, Bio, Physics, Chemistry
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-text-muted">2019</p>
                <p className="text-sm font-medium text-text-primary">60%</p>
              </div>
            </div>
            <div className="h-px bg-border-light" />
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Class X (CBSE)
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Bhavans Sri Ramakrishna Vidyalaya
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-text-muted">2017</p>
                <p className="text-sm font-medium text-text-primary">
                  CGPA: 8.6
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border-light pt-16">
          <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted mb-6">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">English (Fluent)</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Hindi (Fluent)</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Bengali (Native)</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Tamil (Conversational)</span>
          </div>

          <h2 className="text-xs uppercase tracking-[0.25em] text-text-muted mt-10 mb-6">
            Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Singing</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Playing Guitar</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Dancing</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Travelling</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Adventure Activities</span>
            <span className="px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-sm text-text-secondary">Watching Movies</span>
          </div>
        </div>
      </div>
    </section>
  )
}
