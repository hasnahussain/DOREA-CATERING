import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { HeaderComponent } from './components/header/header.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ShareModalComponent } from './pages/share-modal/share-modal.component';

import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent,
    CategoryFilterComponent,
    ProductListComponent,
    CartComponent,
    ShareModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filteredProducts$: Observable<Product[]> = new Observable<Product[]>();
  subcategories$: Observable<string[]> = new Observable<string[]>();
  cartCount$: Observable<number> = new Observable<number>();

  cartProductIds: number[] = [];
  hideHeaderAndCategory = false;

  shareData = {
    title: 'Dorea Catering service and events',
    text: 'Check out this awesome catering platform!',
    url: ''
  };

  showShareModal = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = event.urlAfterRedirects;
        this.hideHeaderAndCategory = ['/checkout', '/about'].some(route => path.startsWith(route));
      }
    });
  }

  ngOnInit(): void {
    // ✅ Set shareData.url safely
    if (isPlatformBrowser(this.platformId)) {
      this.shareData.url = window.location.href;
    }

    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }

    this.cartService.getCart().subscribe(items => {
      this.cartProductIds = items.map(i => i.product.id); 
    });

    this.filteredProducts$ = this.productService.filteredProducts$.pipe(
      map(products => products || []),
      startWith([])
    );

    this.subcategories$ = this.productService.subcategories$.pipe(
      map(subcategories => subcategories || []),
      startWith([])
    );

    this.cartCount$ = this.cartService.cartCount$.pipe(
      map(count => count || 0),
      startWith(0)
    );

    if (this.router.url === '/') {
      this.productService.setCategory('catering');
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  onCategoryChange(category: string): void {
    this.productService.setCategory(category);
  }

  onSubcategoryChange(subcategory: string): void {
    this.productService.setSubcategory(subcategory);
  }

  onSearch(query: string): void {
    this.productService.searchProducts(query);
  }

  onProductAddedToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  onProductRemovedFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

 

  isMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  }
  sharePage(): void {
    const shareData = {
      title: 'Dorea Catering service and events',
      text: 'Check out this awesome catering platform!',
      url: 'http://doreacateringservices.com/'
    };
  
    if (navigator.share && this.isMobile()) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully!'))
        .catch((error) => console.error('Sharing failed:', error));
    } else {
      this.showShareModal = true; 
    }
  }
  
}
