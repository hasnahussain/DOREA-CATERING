import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  private phoneNumber = environment.whatsappNumber;

  generateOrderMessage(order: Order): string {
    let message = 'Order Summary:\n';

    // Add cart items
    order.cartItems.forEach(item => {
      message += `* ${item.product.name} (${item.quantity}x)\n`;
    });

    message += '\n';
    message += `Name: ${order.name}\n`;
    message += `Place: ${order.place}\n`;
    message += `Event: ${order.eventType}\n`;
    message += `Date: ${order.eventDate}\n`;
    message += `Time: ${order.eventTime}\n`;
    message += `Schedule: ${order.scheduleType}\n`;
    message += `Venue: ${order.venue}\n`;
    message += `Person Count: ${order.personCount}\n`;
    message += `Note: ${order.orderNote}\n`;

    return message;
  }

  sendOrderToWhatsApp(order: Order): void {
    const message = this.generateOrderMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }
}
