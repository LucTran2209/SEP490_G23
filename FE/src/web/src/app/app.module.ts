import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';


import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authFeature } from './features/auth/state/auth.feature';
import { AuthEffect } from './features/auth/state/auth.effects';
import { userFeature } from './features/users/state/user.feature';
import { UserEffects } from './features/users/state/user.effects';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(userFeature),
    EffectsModule.forRoot([AuthEffect, UserEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
