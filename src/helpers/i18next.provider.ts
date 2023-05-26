import i18nextConf from '#root/i18next.config';
import { APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

const appInit = (i18next: ITranslationService) => () => i18next.init(i18nextConf);

const localeIdFactory = (i18next: ITranslationService) => i18next.language;

export default [
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
