export interface Product {
    id: number;
    name: string;
    image: string;
    category: 'catering' | 'sadya' | 'events';
    subcategory: string;
    description?: string;
    price?: number;
  }
