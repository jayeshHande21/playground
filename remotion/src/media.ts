import { staticFile } from 'remotion'

export const media = {
  trending: staticFile('ai-generate/trending-floral.jpg'),
  before: staticFile('ai-generate/before-couple.jpg'),
  watercolor: staticFile('ai-generate/template-watercolor.jpg'),
  royal: staticFile('ai-generate/template-royal.jpg'),
  film: staticFile('ai-generate/template-film.jpg'),
  floral: staticFile('ai-generate/template-floral.jpg'),
  result: staticFile('ai-generate/preview-result.jpg'),
  logo: staticFile('ai-generate/fotoowl-logo.svg'),
  introBeat: staticFile('ai-generate/intro-beat.wav'),
  eventGuests: staticFile('ai-generate/event-guests.jpg'),
  eventCeremony: staticFile('ai-generate/event-ceremony.jpg'),
  eventDance: staticFile('ai-generate/event-dance.jpg'),
  eventFamily: staticFile('ai-generate/event-family.jpg'),
  eventWalk: staticFile('ai-generate/event-walk.jpg'),
  enhanceConcert: staticFile('ai-generate/enhance-concert.jpg'),
  enhanceTravel: staticFile('ai-generate/enhance-travel.jpg'),
}

export const templates = [
  {
    id: 'watercolor',
    src: media.watercolor,
    title: 'South Indian Watercolor',
    copy: 'A washed ink wedding portrait — silk, gold, and courtyard light.',
    credits: '−3 credits',
    position: 'center top',
  },
  {
    id: 'royal',
    src: media.royal,
    title: 'Royal Palace Portrait',
    copy: 'Maroon silk and ivory sherwani on palace steps at golden hour.',
    credits: '−4 credits',
    position: 'center 8%',
  },
  {
    id: 'film',
    src: media.film,
    title: 'Destination Film Still',
    copy: 'Dusk terrace, champagne silk, and warm 35mm grain.',
    credits: '−3 credits',
    position: 'center 10%',
  },
] as const
