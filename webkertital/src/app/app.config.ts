import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(), 
    provideFirebaseApp(() => 
      initializeApp({ projectId: "webkertitalbolt", 
        appId: "1:340333591271:web:6873cff3b5b911fc530042", 
        storageBucket: "webkertitalbolt.firebasestorage.app", 
        apiKey: "AIzaSyCsiw8rgZ3JZmOKrCSEyrQ3o04TNo85nos", 
        authDomain: "webkertitalbolt.firebaseapp.com", 
        messagingSenderId: "340333591271" 
      })), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
      ],
};
