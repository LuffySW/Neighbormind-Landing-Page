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
}

export type PageType = 'home' | 'contact';

export interface NavLink {
  name: string;
  action: () => void;
  href: string;
}
