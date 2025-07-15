import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share-modal',
  standalone: true,
  imports: [],
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent {
  readonly url: string = 'http://doreacateringservices.com/';
  readonly text: string = 'Check out this awesome catering platform!';
  
  @Output() close = new EventEmitter<void>();

  shareWhatsApp() {
    const shareText = `${this.text} ${this.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    this.close.emit();
  }

  

  copyLink() {
    navigator.clipboard.writeText(this.url).then(() => {
      alert('Link copied to clipboard!');
    });
    this.close.emit();
  }

  shareSMS() {
    const smsUrl = `sms:?body=${encodeURIComponent(this.text + ' ' + this.url)}`;
    window.open(smsUrl, '_blank');
    this.close.emit();
  }
}
