import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';

import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import localeVI from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { LayoutDashboardComponent } from './components/layout/layout-dashboard/layout-dashboard.component';
import { LayoutUserComponent } from './components/layout/layout-user/layout-user.component';
import { SharedModule } from './components/shared/shared.module';
import { AuthEffect } from './features/auth/state/auth.effects';
import { authFeature } from './features/auth/state/auth.feature';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { httpRequestInterceptor } from './interceptors/http-request.interceptor';
import { responseInterceptor } from './interceptors/response.interceptor';
import { metaReducers } from './store';
import { ProvinceEffect } from './store/province/province.effects';
import { addressFeature } from './store/province/province.reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment.development';
import {AngularFireModule} from '@angular/fire/compat'
import { chatResizeFeature } from './features/chat/state/chat.reducer';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
registerLocaleData(localeVI);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LayoutDashboardComponent,
    LayoutUserComponent,
  ],
  imports: [
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(chatResizeFeature),
    StoreModule.forFeature(addressFeature),
    EffectsModule.forRoot([AuthEffect, ProvinceEffect]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpErrorInterceptor,
      multi: true,
    },
    provideHttpClient(
      withFetch(),
      withInterceptors([httpRequestInterceptor, responseInterceptor])
    ),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
