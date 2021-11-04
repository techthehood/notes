
# chalk notes

```
if (display_console || true) console.log(chalk.keyword('pink')(processed_msg));// works
if (display_console || true) console.log(chalk.keyword('peachPuff')(processed_msg));// failed

if (display_console || true) console.log(chalk.bgKeyword('pink')(processed_msg));works
```
> [w3schools colors](https://www.w3schools.com/tags/ref_colornames.asp)
> some colors names fail, idk which ones work - right now its trial and error
> [chalk's keyword link navigates to this page](https://www.w3.org/wiki/CSS/Properties/color/keywords)
> maybe all the keywords on this page work with chalk keywords

#### working color keywords

- orange
- pink
- aquamarine