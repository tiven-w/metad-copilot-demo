import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { NgmMissingTranslationHandler } from '@metad/ocap-angular/core';
import { ZhHans, ZhHant } from '@metad/ocap-angular/i18n';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LanguagesEnum } from '../config';

class CustomTranslateHttpLoader extends TranslateLoader {
  override getTranslation(lang: string): Observable<any> {
    let ocapTranslates = {};
    switch (lang) {
      case LanguagesEnum.Chinese:
      case LanguagesEnum.SimplifiedChinese:
        ocapTranslates = {
          ...ZhHans,
        };
        break;
      case LanguagesEnum.TraditionalChinese:
        ocapTranslates = {
          ...ZhHant,
        };
        break;
      default:
    }
    return of({
      ...ocapTranslates,
    });
  }
}

export function createTranslateLoader() {
  return new CustomTranslateHttpLoader();
}

export function provideTranslate(): EnvironmentProviders {
  return importProvidersFrom(
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: NgmMissingTranslationHandler,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [],
      },
    })
  );
}
