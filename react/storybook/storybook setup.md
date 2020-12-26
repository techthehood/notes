# Storybook

### Setup

<hr/>
<br/>

#### install react & sass
dependencies:

```
  npm i react react-dom sass
```

#### install and initialize storybook
```
npx sb init
```

#### install dev dependencies
```
  npm i -D @storybook/addon-a11y @storybook/addon-console css-loader sass-loader style-loader
```

#### prep main.js   
*_required for component based stories - otherwise optional_*   

_main.js_   

```
  const path = require('path');
  module.exports = {
    "stories": [
      "../stories/**/*.stories.mdx",
      "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-a11y"
    ],
    webpackFinal: async (config, { configType }) => {
      // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
      // You can change the configuration based on that.
      // 'PRODUCTION' is used when building the static version of storybook.

      // Make whatever fine-grained changes you need
      config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      });

      // Return the altered config
      return config;
    },
  }

```
**_webpackFinal makes it possible to use sass files in your stories_**

#### prep preview.js   
*_required for component based storie - otherwise optionals_*

_preview.js_   

```
  import React from 'react';
  import {addDecorator} from '@storybook/react';
  import Center from '../stories/components/Center';
  import {withConsole} from "@storybook/addon-console";// adds console logs to actions tab
  import {withA11y} from '@storybook/addon-a11y';//  accessibility validator

  // addDecorator(story => <Center>{story()}</Center>);// pre-themed
  // addDecorator(story => <ThemeProvider theme={theme}><CSSReset />{story()}</ThemeProvider>);// example from the video
  // addDecorator(story => <ChakraProvider>{story()}</ChakraProvider>);

  export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: (a, b) =>
        a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
  }

  // sorts categories alphabetically

  // v6 lets me use multiple decorators in an array of decorators - the theme is still not working
  export const decorators = [
    story => <Center>{story()}</Center>,
    (story, context) => withConsole()(story)(context),
    (story) => withA11y(story)
  ]

```

#### [Controlling a story's view mode](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#controlling-a-storys-view-mode)   
- previewTabs property - can put docs tab before canvas tab
- viewMode property - can determine which tab is always displayed when navigating back to a story

```
  <Canvas>
    <Story name="Toast"
      parameters={{
        docs: {
          source: {code:`//triggered by an onClick event
          const {toaster} = require('../../../xfiles/js/lib/elements/toaster/toaster');
          toaster({home, name, message, auto, sec});`}
        },
        viewMode: 'docs',
        previewTabs: { 'storybook/docs/panel': { index: -1 } }
      }}
    >
      {Template.bind({})}
    </Story>
  </Canvas>
```
> views can be controlled down to the individual stories. im sure i can move it to meta for global controls.

#### create a components directory
#### clone Center component [optional]
#### clone css directory

#### [Overwriting docs container](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#overwriting-docs-container)   
> add this parameters prop to the meta tag

```
  parameters={{
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
            <div style={{padding: '0 3rem'}}>{children}</div>
        </DocsContainer>
      ),
    }
  }}
```

_meta tag example_

```
  import { Meta, Description, DocsContainer } from '@storybook/addon-docs/blocks';

  ...

  <Meta title="Storybook/Docs/Setup"
    parameters={{
      docs: {
        container: ({ children, context }) => (
          <DocsContainer context={context}>
              <div style={{padding: '0 3rem'}}>{children}</div>
          </DocsContainer>
        ),
      },
    }}
   />
```
