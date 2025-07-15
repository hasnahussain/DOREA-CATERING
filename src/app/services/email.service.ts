import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Order } from '../models/order';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

private serviceID = environment.emailServiceID;
private templateID = environment.emailTemplateID;
private userID = environment.emailUserID;
private replyTo = environment.replyToEmail;
       

  sendOrderEmail(order: Order): Promise<EmailJSResponseStatus> {
    const orderDetails = this.generateOrderMessage(order);

    const templateParams = {
      to_name: 'Catering Owner',
      from_name: order.name,
      message: orderDetails,
      reply_to: 'hasnahussain217@gmail.com',
      email: 'hasnahussain217@gmail.com' 
    };

    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }

  private generateOrderMessage(order: Order): string {
    let message = 'Order Summary:\n\n';

    order.cartItems.forEach(item => {
      message += `• ${item.product.name} (${item.quantity}x)\n`;
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
    message += `Note: ${order.orderNote || 'N/A'}\n`;

    return message;
  }
}
