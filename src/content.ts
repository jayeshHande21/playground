export type TemplateId = 'royal' | 'film' | 'festival' | 'editorial'

export const templates: {
  id: TemplateId
  name: string
  use: string
}[] = [
  { id: 'royal', name: 'Royal Wedding', use: 'Silk light, jewellery, night reception' },
  { id: 'film', name: 'Vintage Film', use: 'Grain, warm fade, analog stills' },
  { id: 'festival', name: 'Festival Night', use: 'Neon rim light, stage colour' },
  { id: 'editorial', name: 'Studio Editorial', use: 'Hard key light, print contrast' },
]

export const features = [
  {
    id: 'templates',
    title: 'Choose a prepared look',
    body: 'Guests pick from templates the photographer enabled for the event — wedding, film, festival, or studio — instead of describing a prompt.',
  },
  {
    id: 'source',
    title: 'Use the event photo they already have',
    body: 'The same selfie or gallery photo that finds their pictures becomes the source. No second app, no extra signup.',
  },
  {
    id: 'generate',
    title: 'Generate the portrait',
    body: 'FotoOwl renders an AI portrait in that template and drops it back into their personal gallery.',
  },
  {
    id: 'brand',
    title: 'Stay inside the branded gallery',
    body: 'Watermark, download, and share stay on the photographer’s event link — the portrait is another asset, not a detour.',
  },
]

export const testimonials = [
  {
    id: 'mumbai',
    quote:
      'As a luxury wedding photographer in Mumbai, FotoOwl already handles our high-volume shoots. AI Generation is the guest moment we can finally offer without a retouching queue.',
    role: 'Luxury wedding photographer',
    place: 'Mumbai',
  },
  {
    id: 'destination',
    quote:
      'From engagement shoots to destination weddings, guests want a styled portrait they can post that night. Templates give them a look. We keep the gallery.',
    role: 'Destination wedding photographer',
    place: 'Multi-city',
  },
  {
    id: 'planner',
    quote:
      'Managing multiple wedding events weekly is hard. Letting guests generate a template portrait inside the same QR flow keeps previews moving and clients calm.',
    role: 'Event planner',
    place: 'In-house photography team',
  },
]
