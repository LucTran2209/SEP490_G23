import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';


import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HttpClientModule, withInterceptors, HTTP_INTERCEPTORS, withFetch } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authFeature } from './features/auth/state/auth.feature';
import { AuthEffect } from './features/auth/state/auth.effects';
import { metaReducers } from './store';
import { HydrationEffects } from './store/hydration/hydration.effects';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
import { responseInterceptor } from './interceptors/response.interceptor';
import { httpRequestInterceptor } from './interceptors/http-request.interceptor';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature(authFeature),
    EffectsModule.forRoot([HydrationEffects, AuthEffect,
      //  UserEffects
    ]),
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
