# mdx template   
## template for using your .md pages in storybook   
_(.md only - without components)_

1. copy the code below
2. paste it into a [fileName].stories.mdx file

```
  import { Meta, Description, DocsContainer } from '@storybook/addon-docs/blocks';
  import sb_setup from '../../../react/storybook/storybook setup.md';

  <Meta title="Storybook/Docs/Setup"
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

  <Description>{sb_setup}</Description>
```

3. just change the path of the filee you want to import
4. change the name of the component variable
5. change the meta title
6. change the description variable to match the component name
