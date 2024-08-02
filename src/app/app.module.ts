import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from './store/store.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreFirstGuard } from './storeFirst.guard';
import { RandomGeneratorComponent } from './store/randomGenerator.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      StoreModule,
      RouterModule.forRoot([
         {
            path: "store", component: StoreComponent,
            canActivate: [StoreFirstGuard]
         },
         {
            path: "cart", component: CartDetailComponent,
            canActivate: [StoreFirstGuard]
         },
         {
            path: "checkout", component: CheckoutComponent,
            canActivate: [StoreFirstGuard]
         },
         {
            path: "random", component: RandomGeneratorComponent,
            canActivate: [StoreFirstGuard]
         },
         {
            path: "admin",
            loadChildren: () => import("./admin/admin.module")
               .then(m => m.AdminModule),
            canActivate: [StoreFirstGuard]
         },
         { path: "**", redirectTo: "/store" }
      ]),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }),
      BrowserAnimationsModule
   ],
   providers: [StoreFirstGuard],
   bootstrap: [AppComponent]
})
export class AppModule { }
