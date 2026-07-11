import { SkyBackground } from "@/components/sky-background"

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SkyBackground />
      {children}
    </>
  )
}
