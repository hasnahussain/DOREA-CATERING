import { CartItem } from './cart-item';

export interface Order {
  name: string;
  place: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  scheduleType: string;
  venue: string;
  personCount: number;
  orderNote: string;
  cartItems: CartItem[];
}
