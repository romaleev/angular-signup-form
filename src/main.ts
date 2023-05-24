import { AppComponent } from '#src/components/app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { I18NextModule } from 'angular-i18next';
import { importProvidersFrom } from '@angular/core';
import { I18N_PROVIDERS } from '#src/helpers/i18next';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule, I18NextModule.forRoot()),
    I18N_PROVIDERS,
    provideHttpClient(withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));
