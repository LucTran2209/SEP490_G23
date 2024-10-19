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
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LayoutDashboardComponent } from './components/core/layout-dashboard/layout-dashboard.component';
import { LayoutUserComponent } from './components/core/layout-user/layout-user.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { SharedModule } from './components/shared/shared.module';
import { AuthEffect } from './features/auth/state/auth.effects';
import { authFeature } from './features/auth/state/auth.feature';
import { httpErrorInterceptor } from './interceptors/http-error.interceptor';
// import { httpRequestInterceptor } from './interceptors/http-request.interceptor';
import { responseInterceptor } from './interceptors/response.interceptor';
import { metaReducers } from './store';
import { HydrationEffects } from './store/hydration/hydration.effects';
import { addressFeature } from './store/province/province.reducer';
import { LayoutProfileComponent } from './components/core/layout-profile/layout-profile.component';
import { adminReducer } from './features/admin/state/admin.reducer';
import { adminFeature } from './features/admin/state/admin.feature';
import { AdminEffect } from './features/admin/state/admin.effects';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LayoutDashboardComponent,
    LayoutUserComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(addressFeature),
    StoreModule.forFeature(adminFeature),
    
    EffectsModule.forRoot([HydrationEffects, AuthEffect, AdminEffect]),
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
      // withInterceptors([httpRequestInterceptor, responseInterceptor])
      withInterceptors([responseInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
