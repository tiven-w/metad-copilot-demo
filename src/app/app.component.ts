import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { trigger, style, animate, transition, query, stagger, group, sequence } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import {
  NgmCopilotChatComponent,
  injectCopilotCommand,
  injectMakeCopilotActionable,
} from '@metad/ocap-angular/copilot';

type Link = {
  title: string;
  link: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgmCopilotChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger('100ms', [
            animate('100ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
          ])
        ], { optional: true }),
        query(':enter', [
          sequence([
            style({ opacity: 0, transform: 'translateX(-20px)', position: 'absolute' }),
            animate('0ms 100ms', style({position: 'relative'})),
            stagger('100ms', animate('1000ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'metad-copilot-demo';
  helps = signal<Link[]>([
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    {
      title: 'Angular Language Service',
      link: 'https://angular.dev/tools/language-service',
    },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ]);
  #askCommand = injectCopilotCommand({
    name: 'help',
    description: 'Help',
    examples: [
      'Show helps for angular',
      'Show helps for react',
      'Show helps for vue',
    ],
    actions: [
      injectMakeCopilotActionable({
        name: 'show-help',
        description: 'Show helps',
        argumentAnnotations: [
          {
            name: 'helps',
            description: 'Helps for the commands',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of help link',
                },
                link: {
                  type: 'string',
                  description: 'The url of help link',
                },
              },
            } as any,
            required: true,
          },
        ],
        implementation: async (helps: Link[]) => {
          this.helps.set(helps);
        },
      }),
    ],
  });
}
