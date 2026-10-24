import { photos } from './photos';

export const regions = ['Kundapura', 'Udupi', 'Manipal', 'Mangaluru'] as const;

export const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#experience', label: 'Experience' },
  { href: '#home-3d', label: '3D Home' },
  { href: '#spaces', label: 'Capabilities' },
  { href: '#collections', label: 'Collections' },
  { href: '#sovir', label: 'Engineering' },
] as const;

export type SceneId = 'morning' | 'day' | 'evening' | 'cinema';

export interface Scene {
  id: SceneId;
  label: string;
  time: string;
  caption: string;
  photo: string;
  alt: string;
  light: number;
  curtain: number;
  temp: number;
  /** Colour wash laid over the photo for this time of day. */
  tint: string;
}

export const scenes: Scene[] = [
  {
    id: 'morning',
    label: 'Morning',
    time: '06:40',
    caption: 'Curtains glide open with the sunrise.',
    photo: photos.oceanBedroom,
    alt: 'Morning: curtains drawn back to reveal sunlight over the sea',
    light: 45,
    curtain: 100,
    temp: 26,
    tint: 'rgba(255, 196, 140, 0.16)',
  },
  {
    id: 'day',
    label: 'Daylight',
    time: '13:15',
    caption: 'Natural light, steady comfort, nothing to adjust.',
    photo: photos.daylightLiving,
    alt: 'Daylight: a bright, calm living room with a connected speaker',
    light: 30,
    curtain: 70,
    temp: 24,
    tint: 'rgba(22, 141, 223, 0.06)',
  },
  {
    id: 'evening',
    label: 'Evening',
    time: '18:50',
    caption: 'One touch — the living room settles in for family time.',
    photo: photos.sunsetLiving,
    alt: 'Evening: a living room glowing at sunset with the sea outside',
    light: 70,
    curtain: 55,
    temp: 25,
    tint: 'rgba(255, 150, 80, 0.14)',
  },
  {
    id: 'cinema',
    label: 'Cinema',
    time: '21:30',
    caption: 'Lights dim, curtains close, the show begins.',
    photo: photos.homeTheatre,
    alt: 'Cinema: a home theatre with recliners, lights dimmed for a film',
    light: 15,
    curtain: 0,
    temp: 23,
    tint: 'rgba(11, 27, 52, 0.28)',
  },
];

export interface Pillar {
  num: string;
  title: string;
  body: string;
  points: string[];
  photo: string;
  alt: string;
}

export const pillars: Pillar[] = [
  {
    num: '01',
    title: 'Light & Ambience',
    body: 'Scenes, dimming and personalised lighting to suit the moment — from a bright working morning to a slow, golden evening.',
    points: ['Scene presets', 'Smooth dimming', 'Personalised moods'],
    photo: photos.lampLitLiving,
    alt: 'A living room softly lit by warm floor and pendant lamps',
  },
  {
    num: '02',
    title: 'Comfort & Climate',
    body: 'Connected fans, compatible AC controls, curtains and schedules — tuned for humid coastal days and cool monsoon nights.',
    points: ['Fans & AC', 'Motorised curtains', 'Schedules'],
    photo: photos.climatePanel,
    alt: 'A sleek black smart climate controller mounted on a wall',
  },
  {
    num: '03',
    title: 'Safety & Access',
    body: 'Smart locks, entry control, monitoring and integrated alerts — peace of mind whether you are home or away.',
    points: ['Smart locks', 'Entry control', 'Instant alerts'],
    photo: photos.smartLock,
    alt: 'A hand unlocking a smart door lock with a smartphone',
  },
  {
    num: '04',
    title: 'One Connected Experience',
    body: 'Room-wise controls, mobile access, voice and tailored routines — every part of the home, working as one.',
    points: ['Room-wise control', 'Mobile & voice', 'Tailored routines'],
    photo: photos.voiceAndApp,
    alt: 'A voice assistant speaker beside a smartphone showing a home app',
  },
];

export interface Tier {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4;
  tagline: string;
  includes: string[];
  photo: string;
  alt: string;
  badge?: string;
}

export const tiers: Tier[] = [
  {
    id: 'ISHA LITE',
    name: 'Lite',
    level: 1,
    tagline: 'Essential automation for everyday convenience.',
    includes: ['Smart lighting & fans', 'Mobile control', 'Simple schedules'],
    photo: photos.wallSwitch,
    alt: 'A minimal smart wall switch casting a soft shadow',
  },
  {
    id: 'ISHA NOVA',
    name: 'Nova',
    level: 2,
    tagline: 'Connected routines and intelligent room control.',
    includes: ['Everything in Lite', 'Room-wise routines', 'Voice control'],
    photo: photos.smartHub,
    alt: 'A smart home hub and remote on a wooden table beside a plant',
  },
  {
    id: 'ISHA AURA',
    name: 'Aura',
    level: 3,
    tagline: 'Refined ambience and personalised comfort.',
    includes: ['Everything in Nova', 'Lighting scenes & dimming', 'Curtains & climate'],
    photo: photos.pendantLights,
    alt: 'Warm pendant lights glowing over a dining space',
    badge: 'Signature ambience',
  },
  {
    id: 'ISHA ELITE',
    name: 'Elite',
    level: 4,
    tagline: 'Whole-home integration for signature spaces.',
    includes: ['Everything in Aura', 'Safety, access & alerts', 'Whole-home integration'],
    photo: photos.grandResidence,
    alt: 'A grand residence illuminated at night, reflected in its pool',
  },
];

export const principles = [
  {
    icon: 'eye',
    title: 'Invisible by design',
    body: 'Intelligence works quietly in the background. You notice the comfort, not the technology.',
  },
  {
    icon: 'switch',
    title: 'Manual, always within reach',
    body: 'Familiar switches keep working. Automation adds to your home — it never takes control away.',
  },
  {
    icon: 'pin',
    title: 'Local, dependable support',
    body: 'Engineering expertise and on-ground support from a team rooted in Coastal Karnataka.',
  },
] as const;

export const interests = ['Lighting', 'Climate', 'Curtains', 'Safety & access', 'Whole home'] as const;
