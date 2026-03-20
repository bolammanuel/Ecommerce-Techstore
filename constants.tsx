
import { Product } from './types';

export const VAT_RATE = 0.075; // 7.5%

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Pro Laptop 15-inch M3',
    category: 'Laptops',
    description: 'High performance workstation for professionals with liquid retina display and all-day battery life.',
    price: 1299,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    stock: 15,
    isNew: true
  },
  {
    id: '2',
    name: 'Smart Watch Series 7',
    category: 'Wearables',
    description: 'Stay connected and healthy with advanced fitness tracking and blood oxygen monitoring.',
    price: 399,
    originalPrice: 450,
    rating: 4.5,
    reviewCount: 85,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop',
    stock: 22
  },
  {
    id: '3',
    name: 'Sonic Wireless Earbuds',
    category: 'Audio',
    description: 'True wireless freedom with active noise cancellation and spatial audio support.',
    price: 199,
    rating: 4.7,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
    stock: 50
  },
  {
    id: '4',
    name: 'UltraWide 4K Monitor',
    category: 'Smart Home',
    description: 'Crystal clear resolution for creators and gamers with HDR support and 144Hz refresh rate.',
    price: 450,
    rating: 4.8,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
    stock: 8
  },
  {
    id: '5',
    name: 'Home Hub Mini',
    category: 'Smart Home',
    description: 'Control your smart home with just your voice. Compact design with powerful sound.',
    price: 49,
    rating: 4.2,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=800&auto=format&fit=crop',
    stock: 40
  },
  {
    id: '6',
    name: 'X-Phone 13 Pro',
    category: 'Wearables',
    description: 'Professional camera system in your pocket with super retina XDR display.',
    price: 999,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop',
    stock: 12
  }
];
