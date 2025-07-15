import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { CartItem } from '../../models/cart-item';
import { WhatsAppService } from '../../services/whats-app.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { EmailService } from '../../services/email.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent implements OnInit{
  orderForm!: FormGroup;
  cartItems: CartItem[] = [];
  minDate!: string;


  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private whatsappService: WhatsAppService,
    private emailService: EmailService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; 

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      scheduleType: ['', Validators.required],
      venue: [''],
      personCount: [1, [Validators.required, Validators.min(1)]],
      orderNote: ['']
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-food.jpg';
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }
  
  decreaseQuantity(productId: number): void {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity - 1);
    }
  }
  
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
  

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.orderForm.valid && this.cartItems.length > 0) {
      const order: Order = {
        ...this.orderForm.value,
        cartItems: this.cartItems
      };
      this.whatsappService.sendOrderToWhatsApp(order);

      

      this.emailService.sendOrderEmail(order)
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Order sented',
      confirmButtonColor: '#843A6B'
    });
  })
  .catch(error => {
    console.error('Email send failed:', error);
    Swal.fire({
      icon: 'warning',
      title: 'Partial Success',
      text: 'WhatsApp sent, but email failed.',
      confirmButtonColor: '#FFA500'
    });
  });



      this.cartService.clearCart();
      this.router.navigate(['/']); 
    } else {
      this.orderForm.markAllAsTouched();
      if (this.cartItems.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
      } else {
        alert('Please fill in all required event details.');
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
