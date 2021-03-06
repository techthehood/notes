# mdx component template
## template for using your .md pages with a component in storybook
_(.md with components)_

1. copy the code below
2. paste it into a [fileName].stories.mdx file

```
import { Meta, Description, DocsContainer, Canvas, ArgsTable, Story } from '@storybook/addon-docs/blocks';
import join_notes from '../../../xfiles/js/lib/elements/JoinIn/JoinIn.md';
import HomeMaker from './HomeMaker';
import JoinIn from '../../../xfiles/js/lib/elements/JoinIn';
import LinkTo from '@storybook/addon-links/react'


<Meta title="Access/Join in"
  component={JoinIn}
  argTypes={{
    host_data:{
      control:{type:"object"},
      table:{category:"data"},
      defaultValue:{user_id:"what"}
    }
  }}
  parameters={{
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
            <div className="d3-storybook-wrapper" style={{padding: '0 3rem'}}>{children}</div>
        </DocsContainer>
      ),
    },
  }}
/>

<Description>{join_notes}</Description>

<hr/>

export const Template = args => <HomeMaker orient="vert" home="modal_home"><JoinIn {...args} /></HomeMaker>;


<Canvas>
 <Story name="JoinIn"
   parameters={{
     viewMode: 'docs'
   }}
   argTypes={{
     host_data:{
       control:{type:"object"},
       table:{category:"data"},
       defaultValue:{user_id:"what"}
     }
   }}
 >
   {Template.bind({})}
 </Story>
</Canvas>

<ArgsTable story={"JoinIn"} />

<br/>

```

3. just change the path of the .md file you want to import
4. change the name of the files component variable
5. change the meta title
6. change the description variable to match the component name

**component instructions**

7. change component path the the component you want to import
8. change the name of the component variable
9. update the name of the component reference in the meta tag and the Template variable
10. update the meta tags argTypes localize the argTypes to the Canvas component.

```
   <Canvas>
     <Story name="Note"
       parameters={{
         viewMode: 'docs'
       }}
        argTypes={{
          host_data:{
            control:{type:"object"},
            table:{category:"data"},
            defaultValue:{user_id:"whatever"}
          }
        }}
     >
     ...
```

> **GOTCHA:** its better to have all the code close to the edge (without a tab) to keep the javascript from  breaking
