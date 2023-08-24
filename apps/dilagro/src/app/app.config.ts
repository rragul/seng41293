import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app/app.state';
import { provideServiceWorker } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire/compat';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BaseUrlInterceptorService } from './services/_interceptors/base-url-interceptor/base-url-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    importProvidersFrom(NgxsModule.forRoot([AppState], {
      developmentMode: true,
    })),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        apiKey: "AIzaSyBLX-VIr4QUE7U5GUQcBtj9Vufp6sfybyc",
        authDomain: "dilagro-8b48a.firebaseapp.com",
        projectId: "dilagro-8b48a",
        storageBucket: "dilagro-8b48a.appspot.com",
        messagingSenderId: "509615949348",
        appId: "1:509615949348:web:eec5fba34db4685d3a3ab1"
      })
    ),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: "AIzaSyBLX-VIr4QUE7U5GUQcBtj9Vufp6sfybyc",
          authDomain: "dilagro-8b48a.firebaseapp.com",
          projectId: "dilagro-8b48a",
          storageBucket: "dilagro-8b48a.appspot.com",
          messagingSenderId: "509615949348",
          appId: "1:509615949348:web:eec5fba34db4685d3a3ab1"
        })
      ),
    ),
    importProvidersFrom(HttpClientModule),
      {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorService,
      multi: true,
    },
    importProvidersFrom(MatMomentDateModule),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
};
