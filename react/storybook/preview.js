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
