import { SkyBackground } from "@/components/sky-background"

export default function GalleryLayout({
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
