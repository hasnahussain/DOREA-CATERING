import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    // CATERING - Welcome Drinks
    { id: 1, name: 'Fresh Lime Juice', image: 'assets/images/lime-juice.jpg', category: 'catering', subcategory: 'Welcome Drinks' },
    { id: 2, name: 'Fruit Punch', image: 'assets/images/fruit-punch.jpg', category: 'catering', subcategory: 'Welcome Drinks' },
    { id: 3, name: 'Tender Coconut Water', image: 'assets/images/coconut-water.jpg', category: 'catering', subcategory: 'Welcome Drinks' },

    // CATERING - Starters
    { id: 4, name: 'Chicken 65', image: 'assets/images/chicken-65.jpg', category: 'catering', subcategory: 'Starters' },
    { id: 5, name: 'Fish Fry', image: 'assets/images/fish-fry.jpg', category: 'catering', subcategory: 'Starters' },
    { id: 6, name: 'Prawns Roast', image: 'assets/images/prawns-roast.jpg', category: 'catering', subcategory: 'Starters' },

    // CATERING - Soups
    { id: 7, name: 'Tomato Soup', image: 'assets/images/tomato-soup.jpg', category: 'catering', subcategory: 'Soups' },
    { id: 8, name: 'Chicken Soup', image: 'assets/images/chicken-soup.jpg', category: 'catering', subcategory: 'Soups' },

    // CATERING - Main Course
    { id: 9, name: 'Chicken Curry', image: 'assets/images/chicken-curry.jpg', category: 'catering', subcategory: 'Main Course' },
    { id: 10, name: 'Fish Curry', image: 'assets/images/fish-curry.jpg', category: 'catering', subcategory: 'Main Course' },
    { id: 11, name: 'Mutton Curry', image: 'assets/images/mutton-curry.jpg', category: 'catering', subcategory: 'Main Course' },
    { id: 12, name: 'Vegetable Curry', image: 'assets/images/veg-curry.jpg', category: 'catering', subcategory: 'Main Course' },

    // CATERING - Rice & Breads
    { id: 13, name: 'Basmati Rice', image: 'assets/images/basmati-rice.jpg', category: 'catering', subcategory: 'Rice & Breads' },
    { id: 15, name: 'Naan', image: 'assets/images/naan.jpg', category: 'catering', subcategory: 'Rice & Breads' },
    { id: 16, name: 'Chapati', image: 'assets/images/chapati.jpg', category: 'catering', subcategory: 'Rice & Breads' },

    // CATERING - Desserts
    { id: 17, name: 'Gulab Jamun', image: 'assets/images/gulab-jamun.jpg', category: 'catering', subcategory: 'Desserts' },
    { id: 18, name: 'Rasgulla', image: 'assets/images/rasgulla.jpg', category: 'catering', subcategory: 'Desserts' },
    { id: 19, name: 'Payasam', image: 'assets/images/payasam.jpg', category: 'catering', subcategory: 'Desserts' },

    // SADYA - Traditional Items
    { id: 20, name: 'Sambar', image: 'assets/images/sambar.jpg', category: 'sadya', subcategory: 'Traditional Items' },
    { id: 21, name: 'Rasam', image: 'assets/images/rasam.jpg', category: 'sadya', subcategory: 'Traditional Items' },
    { id: 22, name: 'Thoran', image: 'assets/images/thoran.jpg', category: 'sadya', subcategory: 'Traditional Items' },
    { id: 23, name: 'Avial', image: 'assets/images/avial.jpg', category: 'sadya', subcategory: 'Traditional Items' },

    // SADYA - Pickles & Chutneys
    { id: 24, name: 'Mango Pickle', image: 'assets/images/mango-pickle.jpg', category: 'sadya', subcategory: 'Pickles & Chutneys' },
    { id: 25, name: 'Coconut Chutney', image: 'assets/images/coconut-chutney.jpg', category: 'sadya', subcategory: 'Pickles & Chutneys' },

    // EVENTS - Decoration Items
    { id: 26, name: 'Flower Decoration', image: 'assets/images/flower-decoration.jpg', category: 'events', subcategory: 'Decoration Items' },
    { id: 27, name: 'Stage Setup', image: 'assets/images/stage-setup.jpg', category: 'events', subcategory: 'Decoration Items' },
    { id: 28, name: 'Lighting Setup', image: 'assets/images/lighting-setup.jpg', category: 'events', subcategory: 'Decoration Items' },

    // EVENTS - Entertainment
    { id: 29, name: 'DJ Service', image: 'assets/images/dj-service.jpg', category: 'events', subcategory: 'Entertainment' },
    { id: 30, name: 'Live Music', image: 'assets/images/live-music.jpg', category: 'events', subcategory: 'Entertainment' },
    { id: 31, name: 'Photography', image: 'assets/images/photography.jpg', category: 'events', subcategory: 'Entertainment' }
  ];

  private filteredProductsSubject = new BehaviorSubject<Product[]>(this.products);
  public filteredProducts$ = this.filteredProductsSubject.asObservable();

  private subcategoriesSubject = new BehaviorSubject<string[]>([]);
  public subcategories$ = this.subcategoriesSubject.asObservable();

  constructor() {
    this.setCategory('catering');
  }

  setCategory(category: string): void {
    const filtered = this.products.filter(p => p.category === category);
    this.filteredProductsSubject.next(filtered);

    const subcategories = [...new Set(filtered.map(p => p.subcategory))];
    this.subcategoriesSubject.next(subcategories);
  }

  setSubcategory(subcategory: string): void {
    const filtered = this.products.filter(p => p.subcategory === subcategory);
    this.filteredProductsSubject.next(filtered);
  }

  searchProducts(query: string): void {
    if (!query.trim()) {
      this.filteredProductsSubject.next(this.products);
      return;
    }

    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredProductsSubject.next(filtered);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === Number(id));

  }

  getSubcategoriesByCategory(category: string): string[] {
    const filtered = this.products.filter(p => p.category === category);
    return [...new Set(filtered.map(p => p.subcategory))];
  }
}
