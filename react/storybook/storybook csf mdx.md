# what is the relationship between .stories.js (csf) and .stories.mdx (mdx)?
Component Story Format (CSF)

### Articles:
[storybook docs recipes](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-mdx-docs)   
*_powerful article_*

this readme describes the process of coverting between the two formats
[Storybook Codemods](https://github.com/storybookjs/storybook/blob/next/lib/codemod/README.md)   

[storybook controls docs](https://storybook.js.org/docs/react/essentials/controls)   

  - which one takes priority?
  - which one is not needed?
  - if im using mainly .mdx how much of the .stories.js do i need to add?

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
