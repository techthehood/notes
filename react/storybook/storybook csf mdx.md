# Storybook

### CSF & MDX   

<hr/>
<br/>

#### what is the relationship between .stories.js (csf) and .stories.mdx (mdx)?
Component Story Format (CSF)

### Articles:
[storybook docs recipes](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-mdx-docs)   
*_powerful article_*

[Storybook Docs MDX](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/mdx.md)   
_this article was a light weight in the "Documentation-only MDX" section_

[Storybook Codemods](https://github.com/storybookjs/storybook/blob/next/lib/codemod/README.md)   
_this readme describes the process of converting between the two formats_

[storybook controls docs](https://storybook.js.org/docs/react/essentials/controls)   

  - which one takes priority?
  - which one is not needed?
  - if im using mainly .mdx how much of the .stories.js do i need to add?

### Using straight markdown (sort of)   
_see: storybook docs recipes above_

[MDX transclusion](https://mdxjs.com/getting-started#documents)   

[the gatekeepers hint](https://github.com/storybookjs/storybook/issues/10209)   

> The current workaround is not awful, but involves more code than neccesary:  ????

#### adding .md to an mdx file

```
  import { Description } from '@storybook/addon-docs/blocks';
  import Readme from '.README.md';

  <Meta title="Documentation|Readme" />

  <Description>{Readme}</Description>
```
**works**
**GOTCHA: the only difference (miniscule and also major/required) is that all code blocks have to be separated from their headings with an newline**

#### nameing with a category

```
  <Meta title="Documentation/Readme" />
```
> use a '/' instead of '|'

#### naming to create a collapsible folder

```
  <Meta title="Documentation/docs/Readme" />
```

> add a third section to the title and storybook creates a collapsible folder for all related materials

#### markdown only import example

```
  import { Meta, Description, DocsContainer } from '@storybook/addon-docs/blocks';
  import sb_notes from '../../../react/storybook/storybook notes.md';

  <Meta title="Storybook/Docs/Notes"
    parameters={{
      docs: {
        container: ({ children, context }) => (
          <DocsContainer context={context}>
              <div className="d3-storybook-wrapper" style={{padding: '0 3rem'}}>{children}</div>
          </DocsContainer>
        ),
      }
    }}
   />

  <Description>{sb_notes}</Description>
```
> DocsContainer overwrites the docs container
