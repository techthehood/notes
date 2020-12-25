# Storybook

### Tutorial

### Articles
[learn Storybook - online books/tutorial articles](https://www.learnstorybook.com/)   
[Documentation for stakeholders](https://www.learnstorybook.com/design-systems-for-developers/react/en/document/)   

#### Getting started
navigate to directory and run
```
  npx create-react-app react-storybook-v6
```

navigate into storybook directory
```
  cd react-storybook-v6
```

install and initialize storybook
```
  npx sb init
```

#### creating stories
Button.stories.js
```
  import React from 'react';
  import Button from './Button';

  export default {
    title: 'Button',/*mandatory and should be unique throughout entire project*/
    component: Button
  }

  export const Primary = () => <Button variant="primary">Primary</Button>
```
**requires at least one named export**

```
  const Comp = {
    title: 'Button',
    component: Button
  }

  export default Comp;
```
**better syntax avoids no-anonymous defaults warning**

#### specify the named exports
> every named export represents a 'story'
> a menu item is created for each of the named exports
> a named export is basically a react component

> without at least one of these exports the story is completely empty - there isn't even a button section in the docs   

Button.stories.js
```
  export const Primary = () => <Button variant="primary">Primary</Button>
  export const Secondary = () => <Button variant="secondary">Secondary</Button>
  export const Success = () => <Button variant="success">Success</Button>
  export const Danger = () => <Button variant="danger">Danger</Button>
```

#### group stories (4.1)
> can be 'Form/componentName' or 'form/componentName'. can also be 'group/subGroup/componentName'   

Button.stories.js
```
  // i can group stories

  export default {
    title: 'form/Button',
    component: Button
  }
```


#### Renaming stories (4.2)
Button.stories.js
```
  ...
  export const Primary = () => <Button variant="primary">Primary</Button>

  Primary.storyName = "Primary Button";// renaming stories
```

the renaming convention:
```
  Primary.storyName = "Primary Button";// renaming stories

  // the formula
  // namedExport.storyName = "new name string"
```

#### [to alphabetize the stories](https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy)   
got to the docs and find section:

**Sorting stories**
>By default, stories are sorted in the order in which they were imported. This can be overridden by adding storySort to the options parameters in your preview.js file.

>The most powerful method of sorting is to provide a function to storySort. Any custom sorting can be achieved with this method.
```
// .storybook/preview.js

export const parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};
```

copy options portion:
```
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
```

paste after the actions property in
.storybook/preview.js
```
  export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    options: {
      storySort: (a, b) =>
        a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
  }
```

#### story within a story (4.3)
/Subscription/Subscription.stories.js
```
  // a story of stories
  import React from 'react';

  // don't import the components, import the stories we have written for the components
  import {Primary} from '../components/Button/Button.stories';
  import {Large} from '../components/Input/Input.stories';

  const Story = {
    title: 'form/Subscription',
  }

  export default Story;

  // named export
  export const PrimarySubscription = () => (
    <>
      <Large />
      <Primary />
    </>
  )
```

#### Args mechanism (4.4)

Button.stories.js
```
  // args mechanism
  const Template = args => <Button {...args} />

  // export 1 or more stories using this Template

  // create a story using the primary variant of the button
  export const PrimaryA = Template.bind({});
  PrimaryA.args = {
    variant:"primary",
    children:"Primary Args"
  }

          // you can import args fromo another template
          export const LongPrimaryA = Template.bind({});
          LongPrimaryA.args = {
            ...PrimaryA.args,
            children: "Long Primary Args"
          }

  export const SecondaryA = Template.bind({});
  SecondaryA.args = {
    variant: "secondary",
    children: "Secondary Args"
  }
```

you can also specify args at the component level (default export level)
Button.stories.js
```
    const Story = {
      title: 'form/Button',/*mandatory and should be unique throughout entire project*/
      component: Button,
      decorators: [story => <Center>{story()}</Center>],
      args: {
        children: "Button"
      }
    }

    export default Story;

    export const PrimaryA = Template.bind({});
    PrimaryA.args = {
      variant:"primary",
      // children:"Primary Args"// comment out children prop or remove
    }

              // you can import args fromo another template
              export const LongPrimaryA = Template.bind({});
              LongPrimaryA.args = {
                ...PrimaryA.args
              }

    export const SecondaryA = Template.bind({});
    SecondaryA.args = {
      variant: "secondary",
      children: "Secondary Args"
    }
```
**all Templates will have the same children arg unless there is a local declaration of that arg (has 'specificity')**
> the args at the story lvl will overwrite args at the component level

#### adding decorators (5.0)
> you want to add components that help decorate the display. but you want to keep the code DRY
```
  // export const Primary = () => <Center><Button variant="primary">Primary</Button></Center>
  // export const Secondary = () => <Center><Button variant="secondary">Secondary</Button></Center>
  // export const Success = (  ) => <Center><Button variant="success">Success</Button></Center>
  // export const Danger = () => <Center><Button variant="danger">Danger</Button></Center>
```

use a decorator
```
  export default {
    title: 'form/Button',/*mandatory and should be unique throughout entire project*/
    component: Button,
    decorators: [story => <Center>{story()}</Center>]
  }

  prevents having to do this
```
**decorators use a hoc style script to wrap all your components in a component**

#### adding global decorators

.storybook/preview.js
```
  import React from 'react';
  import {addDecorator} from '@storybook/react';
  import Center from '../src/components/Center';

  addDecorator(story => <Center>{story()}</Center>);

  export const parameters = {
  ...

```

alternative decorator (v6)
```
  // addDecorator(story => <Center>{story()}</Center>);// pre-themed

  // v6 lets me use multiple decorators in an array of decorators - the theme is still not working
  export const decorators = [
    story => <ChakraProvider>{story()}</ChakraProvider>,
    story => <Center>{story()}</Center>
  ]
```

#### Theming (6.1 & 6.2) **failed**
[Chakra theming library](chakra-ui.com)   

[install chakra](https://chakra-ui.com/docs/getting-started)   
copy paste code snippet
```
  npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

#### addons (7.1)
[storybook addons](https://github.com/storybookjs/storybook/tree/master/addons)   
[Supercharge Storybook](https://storybook.js.org/addons)   
 - controls add on lets you dynamically change props for components (args)
  **works with template and args**
```
  SecondaryA.args = {
    variant: "secondary",
    children: "Secondary Args"
  }
```

when this was still being bugfixed you may have needed to add argTypes to the Story default component
> the work around
```
  export default {
    title: 'form/Button',/*mandatory and should be unique throughout entire project*/
    component: Button,
    decorators: [story => <Center>{story()}</Center>],
    argTypes:{
      variantColor:{
        control:"text"
      }
    }
  }

  // specifically adding this
  argTypes:{
    variantColor:{
      control:"text"
    }
  }
```

#### actions
adding an onclick action
```
    const Comp = {
      title: 'form/Button',/*mandatory and should be unique throughout entire project*/
      component: Button,
      /* decorators: [story => <Center>{story()}</Center>],*/
      args: {
        children: "Button"
      },
      argTypes:{
        onClick:{action: "clicked"}
      }// works
    }
```
**seems to only work in the default export component ()

adding actions without argTypes
```
  export const Primary = () => <Button onClick={action("Click handler")} variant="primary">Primary</Button>
```

adding to args templates without argTypes
```
    export const SecondaryA = Template.bind({});
    SecondaryA.args = {
      variant: "secondary",
      children: "Secondary Args",
      //onClick:{action: "clicked"}// fails - becomes an arg which can be modified by controls
      // onClick:{action: function(){action("secondary click")}}//failed
      // onClick:()=>{action("secondary click")}//failed
      onClick:action("secondary click")// somehow this works
    }
```

capture multiple events - use actions export on the addon
```
  export const Success = () => <Button {...actions("onClick","onMouseOver")} variant="success">Success</Button>
```
**spread operator actions - displays events as eventName**

#### Logs
> adds console logs to actions tab
```
  export const Danger = () => <Button onClick={() => {console.log("danger clicked");}} variant="danger">Danger</Button>
```
**this is a natural fn of react - not storybook**

log in storybook w/o using the devtools log

install the plugin
```
  npm i -d @storybook/addon-console

```

then add it to the story
```
  // with no objects extracted
  import "@storybook/addon-console";
```
**once this is done the same console.log that is set above on the Danger button will now appear in the actions panel**

to add an enhancement printing the story information where the log statement is from
(done in/with decorators)

.storybook/preview.js
```
  // this time with object extraction
  import {withConsole} "@storybook/addon-console";

  ...

  export const decorators = [
    story => <ChakraProvider>{story()}</ChakraProvider>,
    story => <Center>{story()}</Center>,


    (story, context) => withConsole()(story)(context)


  ]
```
// returns: form/Button/Danger: (1) ["danger clicked"]

#### the docs addon **(docs is already added by default in v6)**
[writing docs introduction](https://storybook.js.org/docs/react/writing-docs/introduction)   
[storybook docspage](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/docspage.md)   
[writing docs docspage](https://storybook.js.org/docs/react/writing-docs/docs-page)   
[storybook docs recipes](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-mdx-docs)   
**see li: 686 mdx format**
install it
```
  npm i -d @storybook/addon-docs
```
then add it to the .storybook/main.js addons - deprecated
**its a pretty large plugin**


### the knobs addon (controls in v6)
google search: storybook knobs vs controls
[Storybook Controls - Live edit UI components with no code](https://medium.com/storybookjs/storybook-controls-ce82af93e430)   
article sample
```
  import { Button } from '@storybook/react/demo';

  export default {
    title: 'Button/Controls',
    component: Button
  };

  export const Basic = (args) => <Button {...args} />;// looks like Template setup
  Basic.args = { children: 'hello' };// also same as Template the without the .bind({}) step
```

my sample
```
  export const knobsTest = args => <Button {...args} />// looks the same as the rest of the story setups only with a parameter
  knobsTest.args = {
    variant:"primary"
  }
```
**works**

// how do i use other forms of inputs in controls?
[storybook docs - controls: choosing control types](https://storybook.js.org/docs/react/essentials/controls)   


#### A11y accessibility addon
installation
```
  npm i -d @storybook/addon-a11y
```

then add to addons in main.js
```
  module.exports = {
    "stories": [
      "../src/**/*.stories.mdx",
      "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/preset-create-react-app",


      "@storybook/addon-a11y"


    ]
  }
```
**for once this was necessary (required)**

add to decorators
```
  import {withA11y} from '@storybook/addon-a11y'

  export const decorators = [
    story => <ChakraProvider>{story()}</ChakraProvider>,
    story => <Center>{story()}</Center>,
    (story, context) => withConsole()(story)(context),


    (story) => withA11y(story)

  ]
```
**works**

#### storysource - source code addon

```
  npm i -D @storybook/addon-storysource
```

```
  "addons": [
    ...
    "@storybook/addon-storysource"
    }// storysource addon
  ...

    // or

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",

    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
          injectStoryParameters: false
        },
      },
    }// storysource addon
  ...

```

**GOTCHA: storysource not showing source code**
[@storybook/addon-storysource v6.1.10 | docs](https://npm.io/package/@storybook/addon-storysource)   

**Displaying full source**
> Storybook 6.0 introduced an unintentional change to source-loader, in which only the source of the selected story is shown in the addon. To restore the old behavior, pass theinjectStoryParameters: false option.

```
  module.exports = {
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
};
```

#### [Writing Docs MDX](https://storybook.js.org/docs/react/writing-docs/mdx)   
[Storybook Docs Recipes](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-mdx-docs)   
**see li: 686 mdx format**


### Essentials are zero config
[Storybook essentials introduction](https://storybook.js.org/docs/react/essentials/introduction)   

>Configuration
Essentials is "zero config”, it comes with a recommended configuration out of the box.

>If you need to reconfigure any of the essential addons, install it manually, following the installation instructions and adjust the configuration to your needs.

>When you start Storybook, Essentials will override its configuration with your own.


#### Storybook does recognize jsDoc "style" comments
**but not as jsDoc comments - it only creates a regular comment**

#### default ArgsTable
```
  const Button = ({variant = "primary", children, ...rest}) => {
    // const {variant = "primary", children, ...rest} = props;
    return (
      <button className={`button ${variant}`} {...rest}>
        {children}
      </button>
    )
  }
```
> if props is deconstructed to display its specific arguments (not children or spread into ...rest)
storybook will display the various props ("arguments") in a table on the docs page.

- to get more detailed tables use prop-types in the stories

#### PropTypes also work right out the box (no npm install)
```
  import PropTypes from 'prop-types';

  const Button = ({variant = "primary", isDisabled = false, children, ...rest}) => {
    ...
  }

  Button.propTypes = {
    /**
     Checks if the button should be disabled
    */
    isDisabled: PropTypes.bool.isRequired,
    /**
    The display content of the button
    */
    content: PropTypes.string.isRequired,
  };

  export default Button;
```
> variant is still included in the ArgsTable along with the more descriptive propTypes ()
> defaults must be added natrually to the prop desctructuring to work
> if you add a default the property looses its "isRequired" proptype even if you set it explicitly

**GOTCHA: ComponentName.propTypes script has to be above the export not below (error)**

#### [ArgsTable](https://storybook.js.org/docs/react/writing-docs/doc-blocks#argstable)   
[Customizing the ArgsTable](https://storybook.js.org/docs/react/writing-docs/doc-blocks#customizing)   
```
  const Comp = {
    title: 'form/Button',/*mandatory and should be unique throughout entire project*/
    component: Button,
    /* decorators: [story => <Center>{story()}</Center>],*/
    args: {
      children: "Button"
    },
    argTypes:{
      variant: {
        description: 'overwritten description',
        table: {
          type: {
              summary: 'something short',
              detail: 'something really really long'
          },
        }
      },
      onClick:{action: "clicked"}
    }// works
  }
```
**failed on docs - maybe it needs a working .mdx file - shows in Canvas > Controls**

#### ArgsTable of= vs story=
```
// variant with additional details - used only in story= (not of=)
  argTypes:{
    variant: {
      description: 'overwritten description',
      table: {
        type: {
            summary: 'something short',
            detail: 'something really really long'
        },
      }
    }
  }


  <ArgsTable of={DivTag} />
  <ArgsTable story={"Secondary"} />
```
of is more generic - it doesn't give you control nor does it show additional any details

#### ArgsTable using categories
```
  <Canvas>
  <Story name="Template"
    args={{children:"DivTag"}}
    argTypes={{
      data:{
        table:{category:"data"}
      },
      variant: {
        table: {category:"css class"}
      }
    }}
  >
    {Template.bind({})}
  </Story>
```
**now i need to find out how to make them start collapsed**

use argTypes to set defaultValue
```
  <Meta
    title="form/Button"
    component={Button}
    argTypes={{
      variant: {defaultValut:"primary"}
    }}
  />

  <Story name="Template"
    args={{children:"DivTag"}}
    argTypes={{
      data:{control:{type:"object"}},
      content:{defaultValue:"some value"}
    }}
  >
    {Template.bind({})}
  </Story>
```

#### [Adding an .mdx file (mdx format)](https://storybook.js.org/docs/react/api/mdx)   
**basic example works**
```
  <!--- MyComponent.stories.mdx -->
  import { Meta, Story, Canvas, Description, ArgsTable } from '@storybook/addon-docs/blocks';
  import Button from './Button'

  <Meta
    title="form/Button"
    component={Button}
    argTypes={{
      variant: "primary"
    }}
  />

  <ArgsTable of={Button} />

  <Story name="Mdxer2">
    <Button variant="secondary">Secondary</Button>
  </Story>
```
**this basic .mdx file works and given the same name as the stories.js file will overwrite it. otherwise its in addition to it**

**GOTCHA: argTypes property in Meta is doing nothing**

```
  <Description markdown={"
    ## Custom description

    Insert fancy markdown here.
  "}/>
```
all variations of using markdown in Description failed

#### [Adding controls to mdx](https://storybook.js.org/docs/react/essentials/controls)   
```
  import { Meta, Story, Canvas, Description, ArgsTable } from '@storybook/addon-docs/blocks';
  import Button from './Button'

  export const Template = args => <Button {...args} />

  <Meta
    title="MDX"
    component={Button}
    argTypes={{
      children: {control:"text"},
      variant: {control: "text"}
      data:{control:"object"},
      content:{control:"none"}
    }}
  />

  ## Adding controls to mdx
  <Story name="Template"
    args={{children:"button"}}
  >
    {Template.bind({})}
  </Story>
```
**setting the meta specifies what type of control input to give the user**
**defaults can be added in individual story's args prop if defaults are not given in the component itself**
**i can add control:"none" to get rid of controls i don't want to update

can also be added directly to the story to avoid adding to stories that aren't editable
```
  <Story name="Template"
    args={{children:"DivTag"}}
    argTypes={{
      data:{control:{type:"object"}}
    }}
  >
    {Template.bind({})}
  </Story>
```
**GOTCHA: objects must be in full (perfect) json format - no shortcuts e.x: {"style":{"border":"5px solid red"}}**

```
  {"style":{"border":"5px solid red","backgroundColor":"black","color":"gold"}}
```

#### [Controlling the show code section using parameters](https://storybook.js.org/docs/react/writing-docs/doc-blocks#docspage-1)   
```
  ## Adding controls to mdx
  // variant with code string
  <Canvas>
  <Story name="Template"
    args={{children:"DivTag"}}
    argTypes={{
      data:{control:{type:"object"}},
    }}
    parameters={{docs: {
      source: {code:"show this code"}
    }}}
  >
    {Template.bind({})}
  </Story>
  </Canvas>

  // variant with type
  <Canvas>
    <Story name="Secondary"
      parameters={{docs: {
        source: {type: "code"}
      }}}
    >
      <DivTag variant="secondary">Secondary</DivTag>
    </Story>
  </Canvas>
```
**not extremely useful unless i wanted to add an example and have it appear with the component**

still haven't come across how to make the actual component code visible
> (idk if i need it but i like to be able to if possible)

#### [adding script tags, links and custom html](https://storybook.js.org/docs/react/configure/story-rendering#adding-to-head)   
- .storybook/preview-head.html
**adding to the head element**
```
  <!-- .storybook/preview-head.html -->

  <!-- Pull in static files served from your Static director or the internet -->
  <link rel=”preload” href=”your/font” />
  <!-- Or you can load custom head-tag JavaScript: -->
  <script src="https://use.typekit.net/xxxyyy.js"></script>
  <script>try{ Typekit.load(); } catch(e){ }</script>
```

**adding to the body element**
.storybook/preview-body.html
```
  <!--  .storybook/preview-body.html -->

  <div id="custom-root"></div>
```

#### adding scss files
  - i can't use style elements to add scss files but i can directly require scss files from anywhere in my dir hierarchy
  - i want to set up a css folder with a style.scss file that i can use to add global styles to any .stories


#### building helper components
- it may help me display my components by building helper components that i can use to help trigger the target component


to get the prop descriptions to show
```
  npm install -D babel-plugin-react-docgen
```
**failed - also needs to use a .babelrc file?**

main.js
```
  argTypes={{
    message:{
      control:{type:"text"},
      description:"toast user message",
      table: {type: {summary: 'text', detail: 'something really really long'}}
    },
    ...
```

to add better src code - use parameters prop in Story
```
  <Canvas>
    <Story name="toast"
      parameters={{docs: {
        source: {code:"toaster({home, name, message, auto, sec}) \n <Toast {...{name, message, auto, sec}} ></Toast>"}
      }}}
    >
      {Template.bind({})}
    </Story>
  </Canvas>
```

#### [Hide NoControls warning](https://storybook.js.org/docs/react/essentials/controls#hide-nocontrols-warning)   
>If you don't plan to handle the control args inside your Story, you can remove the warning with:

```
  // Button.stories.js

  export const Large = Template.bind({});

  Large.parameters = {
  controls: { hideNoControlsWarning: true },
  };
```

#### [Controlling a story's view mode](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#controlling-a-storys-view-mode)   
- previewTabs property - can put docs tab before canvas tab
- viewMode property - can determine which tab is always displayed when navigating back to a story
```
  <Canvas>
    <Story name="Toast"
      parameters={{docs: {
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


#### [Publish Storybook](https://storybook.js.org/docs/react/workflows/publish-storybook)   
[storybook deployer](https://github.com/storybookjs/storybook-deployer)   
[what is chromatic](https://www.chromatic.com/features/publish)   

publish storybook to github pages so it can exists in your repo
