import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '#src/app/app.component';
import { InputComponent } from '#src/app/input/input.component';
import i18nextConf from '#root/i18next.config';

export function appInit(i18next: ITranslationService) {
  return () => i18next.init(i18nextConf);
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, InputComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, I18NextModule.forRoot()],
  providers: [I18N_PROVIDERS]
})
export class AppModule {}
