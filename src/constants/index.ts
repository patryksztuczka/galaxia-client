import { IMenuItem } from "../types/IMenuItem";
import ChampagneGlassesIcon from "../assets/icons/ChampagneGlassesIcon";
import GearIcon from "../assets/icons/GearIcon";

export const routePaths = {
  home: "/",
  login: "/login",
  signup: "/signup",
  explore: "/explore",
  settings: "/settings",
};

export const BREAKPOINTS = {
  mobile: 768,
};

export const menuItems: IMenuItem[] = [
  {
    label: "🏡 Home",
    route: routePaths.home,
    // icon: ChampagneGlassesIcon,
  },
  {
    label: "🌍 Explore",
    route: routePaths.explore,
    // icon: ChampagneGlassesIcon,
  },
];
