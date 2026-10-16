/**
 * types.ts
 * -----------
 * All shared TypeScript types (interfaces) of the website live here.
 * Think of an interface as a "contract" describing the shape of an object.
 */

/** The pages of the site. Used to mark the active navigation link. */
export type PageName =
  | 'home'
  | 'band'
  | 'termine'
  | 'kontakt'
  | 'galerie'
  | 'impressum'

/** One band member, as shown on the "Band" page. */
export interface BandMember {
  name: string
  role: string
  /** Instrument or voice, e.g. "Gesang" or "Tenor Sax." */
  email: string
}

/** A gig / event, as shown on the "Termine" page. */
export interface BandEvent {
  /** ISO date string, e.g. "2026-10-28" (easily converted to a Date) */
  date: string
  title: string
  location: string
  address?: string
  time?: string
  admission?: string
  note?: string
  /** true if the event was called off (German: "abgesagt") */
  cancelled?: boolean
}

/** Contact details shown in the footer and on the "Kontakt" page. */
export interface ContactInfo {
  city: string
  country: string
  phone: string
  email: string
  facebookUrl: string
}

/** A gallery picture, served from the project's public/images/ folder. */
export interface GalleryPicture {
  title: string
  /** Path as served by Vite, e.g. "/images/band-2022.jpg" (from public/images/) */
  src: string
  /** Accessible description of the photo (also used as lightbox caption) */
  alt: string
}
