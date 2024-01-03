import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'

import { provideClientCopilot } from '@metad/ocap-angular/copilot';
import { provideMarkdown } from 'ngx-markdown'
import { routes } from './app.routes';
import { provideLogger, provideTranslate } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideTranslate(),
    provideLogger(),
    provideClientCopilot(() =>
      Promise.resolve({
        enabled: true,
        chatUrl: '',
        modelsUrl: '',
        apiKey: 'sk-xxxxxxx',
        provider: "openai",
      })
    ),
    provideMarkdown()
  ],
};
