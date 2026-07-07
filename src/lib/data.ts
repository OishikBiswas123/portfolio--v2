export interface Project {
  slug: string
  title: string
  description: string
  fullDescription: string
  category: string
  techStack: string[]
  thumbnail?: string
  images: string[]
  videos: string[]
  liveUrl?: string
  githubUrl?: string
  highlights?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  readTime: number
}

export const projects: Project[] = [
  {
    slug: "bhootiya-forest",
    title: "Bhootiya Forest",
    description:
      "A horror survival game published on the Play Store — explore a haunted forest, find hidden keys, and escape a chasing ghost before time runs out.",
    fullDescription:
      "Bhootiya Forest is a Unity-powered survival horror game that I designed, developed, and published entirely on my own. The game features two distinct areas: a peaceful city for exploration and NPC interaction, and a dangerous forest filled with mystery and horror. Players must find hidden keys under random trees while evading a relentless ghost that chases them before the timer runs out. Everything from game planning and character design to development and Play Store publishing was done by me over two months.",
    category: "Game",
    techStack: ["Unity", "C#", "Photoshop"],
    thumbnail: "/projects/bhootiya-forest/icon.jpg",
    images: [
      "/projects/bhootiya-forest/screenshot-1.jpg",
      "/projects/bhootiya-forest/screenshot-2.jpg",
      "/projects/bhootiya-forest/screenshot-3.jpg",
      "/projects/bhootiya-forest/screenshot-4.jpg",
      "/projects/bhootiya-forest/screenshot-5.jpg",
    ],
    videos: [],
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.oishik.bhootiyaforestgame&pcampaignid=web_share",
    githubUrl: "https://github.com/OishikBiswas123/bhootiya-forest.git",
    highlights: [
      "Solo developed from concept to Play Store launch",
      "Custom character design and game mechanics",
      "Two distinct game areas with unique atmospheres",
    ],
  },
  {
    slug: "groundgrace",
    title: "GroundGrace",
    description:
      "A modern construction and interior design website built for a client — complete with branding, philosophy, and end-to-end service showcase.",
    fullDescription:
      "GroundGrace is a professional website I built from scratch for a construction and interior design company. I handled everything — naming the company, crafting the tagline 'Let's master your dreams from root to roof', designing the brand identity, and developing the full website. The platform showcases their services including architectural planning, house construction, interior design, renovation, modular kitchens, false ceilings, and turnkey project execution. Built on the philosophy of quality craftsmanship and transparent communication, the site reflects the client's commitment to elegant, durable spaces.",
    category: "Web App",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: [],
    videos: ["/projects/gg-logo-animation.mp4"],
    liveUrl: "https://groundgrace.vercel.app/",
    githubUrl: "https://github.com/OishikBiswas123/GroundGrace.git",
    highlights: [
      "Full client delivery — naming, branding, and development",
      "Custom logo animation and brand identity creation",
      "End-to-end service showcase with project portfolio",
    ],
  },
]

export const galleryItems: { src: string; alt: string; type: "image" | "video" }[] = [
  { src: "/Gallery/oishik biswas (10).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (11).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (12).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (13).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (14).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (15).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (16).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (2).jpeg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Oishik Biswas (2).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Oishik Biswas (3).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Oishik biswas (4).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Oishik Biswas (5).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Oishik biswas (6).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (7).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (8).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas (9).jpg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas.jpeg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas.JPG", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/Screenshot_2023_0309_223005.jpg", alt: "Screenshot", type: "image" },
  { src: "/Gallery/oishik biswas at beach.mp4", alt: "Oishik Biswas at beach", type: "video" },
  { src: "/Gallery/oishik biswas at dubai.mp4", alt: "Oishik Biswas at Dubai", type: "video" },
  { src: "/Gallery/oishik biswas besabriya.mp4", alt: "Oishik Biswas Besabriya", type: "video" },
  { src: "/Gallery/oishik biswas college performance.mp4", alt: "Oishik Biswas college performance", type: "video" },
  { src: "/Gallery/oishik biswas dance.mp4", alt: "Oishik Biswas dance", type: "video" },
  { src: "/Gallery/oishik biswas on stone dancing.mp4", alt: "Oishik Biswas dancing on stone", type: "video" },
  { src: "/Gallery/oishik biswas reel.mp4", alt: "Oishik Biswas reel", type: "video" },
  { src: "/Gallery/oishik biswas snowfall.mp4", alt: "Oishik Biswas snowfall", type: "video" },
]

export const skills = [
  "Unity",
  "C#",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "HTML/CSS",
  "Photoshop",
  "Git",
]

export const blogPosts: BlogPost[] = []

export const personalInfo = {
  name: "Oishik Biswas",
  title: "Developer & Creator",
  email: "oishikthegreat@gmail.com",
  phone: "+91 7044952230",
  location: "Natagarh, Panihati, Kolkata 700113, West Bengal, India",
  social: {
    github: "https://github.com/OishikBiswas123",
    linkedin: "https://www.linkedin.com/in/oishik-biswas-1487003aa/",
    whatsapp: "https://wa.me/917044952230",
  },
}
