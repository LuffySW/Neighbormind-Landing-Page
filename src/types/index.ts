export interface CarouselItem {
  img: string;
  title: string;
  desc: string;
}

export interface Scene {
  title?: string;
  subtitle?: string;
  text?: string[];
  details?: string[];
  hotspots?: { x: number; y: number; title: string; desc: string; }[];
  carousel?: CarouselItem[];
  isFinal?: boolean; // If true, this scene will render the CTA
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  desc: string;
  longDesc: string;
  img: string;
  hoverImg?: string;
  collection: string;
  story?: string;
  hotspots?: { x: number; y: number; title: string; desc: string; }[];
  scenes?: Scene[];
  shopeeLink?: string;
}

export type PageType = 'home' | 'contact';

export interface NavLink {
  name: string;
  action: () => void;
  href: string;
}
