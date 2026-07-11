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
  {
    slug: "abs-cafe",
    title: "AB's Cafe",
    description:
      "A full-stack restaurant management mobile app with real-time ordering, table management, payment processing, and an admin dashboard — built for a local cafe.",
    fullDescription:
      "AB's Cafe is a complete restaurant management solution I built from scratch for a local cafe. It features a Kotlin-based Android app for customers and staff, paired with a Node.js/Express backend handling authentication, table assignments, menu browsing, order processing, payment integration, and admin reporting. Real-time order sync between front-of-house and kitchen is powered by Socket.IO. The backend uses PostgreSQL for persistence and JWT-based authentication with role-based access control.",
    category: "Mobile App",
    techStack: [
      "Kotlin",
      "Android",
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Socket.IO",
      "JWT",
    ],
    thumbnail: "/projects/abs-cafe/logo.png",
    images: [],
    videos: [],
    githubUrl: "https://github.com/OishikBiswas123/AB-s-Cafe-android-app.git",
    highlights: [
      "Full-stack mobile app with real-time order sync via Socket.IO",
      "JWT authentication with role-based access control",
      "Complete restaurant workflow: tables, menu, orders, payments, reports",
    ],
  },
]

export const galleryItems: { src: string; alt: string; type: "image" | "video" }[] = [
  { src: "/Gallery/oishik biswas (10).jpg", alt: "Oishik Biswas (10)", type: "image" },
  { src: "/Gallery/oishik biswas (11).jpg", alt: "Oishik Biswas (11)", type: "image" },
  { src: "/Gallery/oishik biswas (12).jpg", alt: "Oishik Biswas (12)", type: "image" },
  { src: "/Gallery/oishik biswas (13).jpg", alt: "Oishik Biswas (13)", type: "image" },
  { src: "/Gallery/oishik biswas (14).jpg", alt: "Oishik Biswas (14)", type: "image" },
  { src: "/Gallery/oishik biswas (15).jpg", alt: "Oishik Biswas (15)", type: "image" },
  { src: "/Gallery/oishik biswas (16).jpg", alt: "Oishik Biswas (16)", type: "image" },
  { src: "/Gallery/oishik biswas (17).JPG", alt: "Oishik Biswas (17)", type: "image" },
  { src: "/Gallery/oishik biswas (18).jpg", alt: "Oishik Biswas (18)", type: "image" },
  { src: "/Gallery/oishik biswas (19).jpg", alt: "Oishik Biswas (19)", type: "image" },
  { src: "/Gallery/oishik biswas (2).jpeg", alt: "Oishik Biswas (2)", type: "image" },
  { src: "/Gallery/Oishik Biswas (2).jpg", alt: "Oishik Biswas (2)", type: "image" },
  { src: "/Gallery/oishik biswas (20).jpg", alt: "Oishik Biswas (20)", type: "image" },
  { src: "/Gallery/oishik biswas (21).jpg", alt: "Oishik Biswas (21)", type: "image" },
  { src: "/Gallery/oishik biswas (22).jpg", alt: "Oishik Biswas (22)", type: "image" },
  { src: "/Gallery/oishik biswas (23).jpg", alt: "Oishik Biswas (23)", type: "image" },
  { src: "/Gallery/oishik biswas (24).jpg", alt: "Oishik Biswas (24)", type: "image" },
  { src: "/Gallery/oishik biswas (25).jpg", alt: "Oishik Biswas (25)", type: "image" },
  { src: "/Gallery/oishik biswas (26).jpg", alt: "Oishik Biswas (26)", type: "image" },
  { src: "/Gallery/oishik biswas (27).jpg", alt: "Oishik Biswas (27)", type: "image" },
  { src: "/Gallery/oishik biswas (28).jpg", alt: "Oishik Biswas (28)", type: "image" },
  { src: "/Gallery/oishik biswas (29).jpg", alt: "Oishik Biswas (29)", type: "image" },
  { src: "/Gallery/oishik biswas (3).jpeg", alt: "Oishik Biswas (3)", type: "image" },
  { src: "/Gallery/Oishik Biswas (3).jpg", alt: "Oishik Biswas (3)", type: "image" },
  { src: "/Gallery/oishik biswas (30).jpg", alt: "Oishik Biswas (30)", type: "image" },
  { src: "/Gallery/oishik biswas (31).jpg", alt: "Oishik Biswas (31)", type: "image" },
  { src: "/Gallery/oishik biswas (32).jpg", alt: "Oishik Biswas (32)", type: "image" },
  { src: "/Gallery/oishik biswas (33).jpg", alt: "Oishik Biswas (33)", type: "image" },
  { src: "/Gallery/oishik biswas (34).jpg", alt: "Oishik Biswas (34)", type: "image" },
  { src: "/Gallery/oishik biswas (35).jpg", alt: "Oishik Biswas (35)", type: "image" },
  { src: "/Gallery/oishik biswas (36).jpg", alt: "Oishik Biswas (36)", type: "image" },
  { src: "/Gallery/oishik biswas (37).jpg", alt: "Oishik Biswas (37)", type: "image" },
  { src: "/Gallery/oishik biswas (38).jpg", alt: "Oishik Biswas (38)", type: "image" },
  { src: "/Gallery/oishik biswas (39).jpg", alt: "Oishik Biswas (39)", type: "image" },
  { src: "/Gallery/oishik biswas (4).jpeg", alt: "Oishik Biswas (4)", type: "image" },
  { src: "/Gallery/Oishik biswas (4).jpg", alt: "Oishik Biswas (4)", type: "image" },
  { src: "/Gallery/oishik biswas (40).jpg", alt: "Oishik Biswas (40)", type: "image" },
  { src: "/Gallery/oishik biswas (41).jpg", alt: "Oishik Biswas (41)", type: "image" },
  { src: "/Gallery/oishik biswas (42).jpg", alt: "Oishik Biswas (42)", type: "image" },
  { src: "/Gallery/oishik biswas (43).jpg", alt: "Oishik Biswas (43)", type: "image" },
  { src: "/Gallery/oishik biswas (44).jpg", alt: "Oishik Biswas (44)", type: "image" },
  { src: "/Gallery/Oishik Biswas (5).jpg", alt: "Oishik Biswas (5)", type: "image" },
  { src: "/Gallery/Oishik biswas (6).jpg", alt: "Oishik Biswas (6)", type: "image" },
  { src: "/Gallery/oishik biswas (7).jpg", alt: "Oishik Biswas (7)", type: "image" },
  { src: "/Gallery/oishik biswas (8).jpg", alt: "Oishik Biswas (8)", type: "image" },
  { src: "/Gallery/oishik biswas (9).jpg", alt: "Oishik Biswas (9)", type: "image" },
  { src: "/Gallery/oishik biswas family.jpg", alt: "Oishik Biswas Family", type: "image" },
  { src: "/Gallery/oishik biswas.jpeg", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas.JPG", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas.png", alt: "Oishik Biswas", type: "image" },
  { src: "/Gallery/oishik biswas at beach.mp4", alt: "Oishik Biswas at beach", type: "video" },
  { src: "/Gallery/oishik biswas at dubai.mp4", alt: "Oishik Biswas at Dubai", type: "video" },
  { src: "/Gallery/oishik biswas besabriya.mp4", alt: "Oishik Biswas Besabriya", type: "video" },
  { src: "/Gallery/oishik biswas college performance.mp4", alt: "Oishik Biswas college performance", type: "video" },
  { src: "/Gallery/oishik biswas dance.mp4", alt: "Oishik Biswas dance", type: "video" },
  { src: "/Gallery/oishik biswas on stone dancing.mp4", alt: "Oishik Biswas dancing on stone", type: "video" },
  { src: "/Gallery/oishik biswas pop dance.mp4", alt: "Oishik Biswas pop dance", type: "video" },
  { src: "/Gallery/oishik biswas reel.mp4", alt: "Oishik Biswas reel", type: "video" },
  { src: "/Gallery/oishik biswas snowfall.mp4", alt: "Oishik Biswas snowfall", type: "video" },
  { src: "/Gallery/oishik biswas terrace video.MOV", alt: "Oishik Biswas terrace video", type: "video" },
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
