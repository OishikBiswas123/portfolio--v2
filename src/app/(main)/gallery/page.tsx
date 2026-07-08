import { GalleryGrid } from "@/components/gallery-grid"
import { galleryItems } from "@/lib/data"

export default function GalleryPage() {

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-tight">
          Gallery
        </h1>
        <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
          Moments frozen in time — from projects and events to everyday life,
          here&apos;s a visual diary of what I&apos;ve been up to.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {galleryItems.length > 0 ? (
          <GalleryGrid items={galleryItems} />
        ) : (
          <div className="text-center py-24 text-text-muted">
            <p className="text-sm uppercase tracking-widest">
              Gallery coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
