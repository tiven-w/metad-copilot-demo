# MetadCopilotDemo

`@metad/ocap-angular` 是一个为 Angular 框架设计的 UI 组件库。其中 `@metad/ocap-angular/copilot` 是 Copilot chat UI 组件，它建立在 `@metad/copilot` 的基础之上，旨在帮助用户在 Angular 应用中轻松地集成和构建 Copilot 聊天功能。

## 安装

通过 npm 安装 `@metad/ocap-angular`：

```bash
npm install @metad/ocap-angular
```

## 配置

在使用 Copilot 组件前需要提供配置参数。您可以通过 `provideClientCopilot` 函数并传入 AI API 参数来提供。

```typescript
import { provideClientCopilot } from '@metad/ocap-angular/copilot'
import { provideMarkdown } from 'ngx-markdown'

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientCopilot(async () =>
      ({
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
```

## 使用

在您的 Angular 应用中引入 `@metad/ocap-angular/copilot` 模块：

```typescript
import {
  NgmCopilotChatComponent,
  injectCopilotCommand,
  injectMakeCopilotActionable,
} from '@metad/ocap-angular/copilot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgmCopilotChatComponent],
})
export class AppComponent { }
```

在您的组件模板中使用 Copilot Chat 组件：

```html
<ngm-copilot-chat></ngm-copilot-chat>
```

这样 Copilot Chat 基础聊天功能便可以使用了。

## 功能

还提供了两个函数用于自定义命令来执行特定的操作：

- `injectCopilotCommand` Inject custom commands
- `injectMakeCopilotActionable` Inject the callable function of the custom command


### injectCopilotCommand

| Property | Example | Description |
|------|------|------|
| `name` | 'form' | The unique identifier of the custom command, which is used to identify the command in front of the Copilot dialog prompt |
| `description` | 'Descripe how to fill the form' | Describes how to use this command, prompting the user how to write the prompt |
| `examples` | `['A', 'B']` | Examples of how to write the prompt for this command, which helps the user to quickly enter the prompt |
| `actions` | `[]` | The operation function implementation available for this command, if not specified, all operation functions in the current context will be used |

### injectMakeCopilotActionable

| Property | Example | Description |
|------|------|------|
| `name` | 'fill_form' | The unique identifier of the operation function, which is used by the AI to identify the call to this function |
| `description` | 'Fill the form' | Describes the function |
| `argumentAnnotations` | `[]` | The definition of the input parameters of the function |
| `implementation` | `async function` | The implementation logic of the function, returning no value or returning a string will end the command session, returning Message will continue the command session |

argumentAnnotations:

| Property | Example | Description |
|------|------|------|
| `name` | 'form' | The name of the input parameter |
| `type` | 'string' | The type of the parameter |
| `description` | 'The form to fill' | The description of the parameter |
| `required` | `true` | Whether the parameter is required |
| `properties` | `[]` | The property definition of the input parameter of the function |

For the `properties` attribute, you can define it directly or use the [zod](https://zod.dev/) library for definition, for example:

```ts
import { z, ZodType, ZodTypeDef } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'

{
    properties: (<{ properties: any }>zodToJsonSchema(z.object({
                title: z.string().describe('The title of form'),
                desc: z.string().description('My Milestone Work Objectives'),
                standard: z.string().description('My Satisfaction Measurement Standard'),
              }))).properties
}
```
