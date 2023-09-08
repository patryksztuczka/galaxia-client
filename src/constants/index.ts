import { IMenuItem } from '../types/IMenuItem';

export const routePaths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  explore: '/explore',

  events: '/events',
  event: '/events/:id',
  eventsByCategory: '/events/category/:category',
  eventsCategory: '/events/category',
  createEvent: '/events/create',
  editEvent: '/events/edit/:id',

  profiles: '/profiles',
  profile: '/profiles/:id',

  settings: '/settings',
};

export const BREAKPOINTS = {
  mobile: 768,
};

export const menuItems: IMenuItem[] = [
  {
    label: '🌍 Explore',
    route: routePaths.home,
  },
];

export const categories: string[] = [
  'music',
  'tech',
  'party',
  'sports',
  'arts',
  'health',
  'fashion',
];

export const imageExtensionsUpload = {
  'image/*': ['.jpeg', '.jpg', '.bmp', '.svg', '.png', '.webp'],
};
