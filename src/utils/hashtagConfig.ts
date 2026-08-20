import { HashtagType } from '../types';

export interface HashtagInfo {
  tag: HashtagType;
  displayName: string;
  badgeLabel: string;
  description: string;
  actionTitle: string;
  actionIcon: string;
  requiresTimer: boolean;
  colorClass: {
    bg: string;
    text: string;
    border: string;
    pill: string;
    accent: string;
    glow: string;
  };
}

export const HASHTAG_CONFIGS: Record<HashtagType, HashtagInfo> = {
  foodsplit: {
    tag: 'foodsplit',
    displayName: '#foodsplit',
    badgeLabel: 'Food Order Split',
    description: 'Pool orders together to meet minimum delivery thresholds and split delivery fees/tips.',
    actionTitle: 'Join Live Order Room',
    actionIcon: 'UtensilsCrossed',
    requiresTimer: true,
    colorClass: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-500/30',
      pill: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
      accent: 'bg-amber-500',
      glow: 'shadow-amber-500/20'
    }
  },
  cabsplit: {
    tag: 'cabsplit',
    displayName: '#cabsplit',
    badgeLabel: 'Ride & Fare Split',
    description: 'Find campus companions heading the same direction to share Uber/Lyft/cabs.',
    actionTitle: 'Join Ride Room',
    actionIcon: 'Car',
    requiresTimer: true,
    colorClass: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
      pill: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
      accent: 'bg-emerald-500',
      glow: 'shadow-emerald-500/20'
    }
  },
  resell: {
    tag: 'resell',
    displayName: '#resell',
    badgeLabel: 'Campus Resale',
    description: 'Buy & sell textbooks, electronics, cycles, and room decor directly with campus peers.',
    actionTitle: 'Open Resell Room',
    actionIcon: 'Tag',
    requiresTimer: false,
    colorClass: {
      bg: 'bg-violet-500/10',
      text: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-500/30',
      pill: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800/60',
      accent: 'bg-violet-500',
      glow: 'shadow-violet-500/20'
    }
  },
  lost: {
    tag: 'lost',
    displayName: '#lost',
    badgeLabel: 'Lost Item',
    description: 'Post missing items to alert campus peers with direct private contact info.',
    actionTitle: 'View Contact Info',
    actionIcon: 'HelpCircle',
    requiresTimer: false,
    colorClass: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500/30',
      pill: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60',
      accent: 'bg-rose-500',
      glow: 'shadow-rose-500/20'
    }
  },
  found: {
    tag: 'found',
    displayName: '#found',
    badgeLabel: 'Found Item',
    description: 'Found unattended belongings on campus. Connect privately with the rightful owner.',
    actionTitle: 'Contact Finder',
    actionIcon: 'Compass',
    requiresTimer: false,
    colorClass: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-600 dark:text-cyan-400',
      border: 'border-cyan-500/30',
      pill: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60',
      accent: 'bg-cyan-500',
      glow: 'shadow-cyan-500/20'
    }
  },
  general: {
    tag: 'general',
    displayName: '#campus',
    badgeLabel: 'Campus Discussion',
    description: 'General campus buzz and announcements.',
    actionTitle: 'View Discussion',
    actionIcon: 'MessageSquare',
    requiresTimer: false,
    colorClass: {
      bg: 'bg-slate-500/10',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-500/30',
      pill: 'bg-slate-100 text-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800/60',
      accent: 'bg-slate-500',
      glow: 'shadow-slate-500/20'
    }
  }
};

export function extractPrimaryHashtag(hashtags: string[]): HashtagType {
  if (!hashtags || hashtags.length === 0) return 'general';
  for (const h of hashtags) {
    const clean = h.replace(/^#/, '').toLowerCase().trim();
    if (clean in HASHTAG_CONFIGS) {
      return clean as HashtagType;
    }
  }
  return 'general';
}
