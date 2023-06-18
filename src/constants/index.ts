import { IMenuItem } from '../types/IMenuItem';
import ChampagneGlassesIcon from '../assets/icons/ChampagneGlassesIcon';
import GearIcon from '../assets/icons/GearIcon';

export const routePaths = {
  home: '/',
  login: '/login',
  signup: '/signup',
  explore: '/explore',

  events: '/events',
  event: '/events/:id',

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
    // icon: ChampagneGlassesIcon,
  },
];
