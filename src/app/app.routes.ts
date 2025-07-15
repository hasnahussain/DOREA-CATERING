import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { AboutComponent } from './pages/about/about.component';
import { ShareModalComponent } from './pages/share-modal/share-modal.component';



export const routes: Routes = [

    { path: '', component: HomeComponent }, 
    { path: 'checkout', component: CheckoutFormComponent },
    { path: 'about', component: AboutComponent },
    { path: 'share', component:ShareModalComponent},
    { path: '**', redirectTo: '' }
];
