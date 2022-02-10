# Material UI notes

### Articles

GOTCHA: Cannot find module 'react/jsx-runtime

[Introducing the New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)   

#### upgrade the cdn to 17^

*pp_vendor.hbs*

```
  <script type="text/javascript" src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
  <script type="text/javascript" src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
```

#### update [preset-react](https://babeljs.io/docs/en/babel-preset-react/)   

```
  npm update @babel/core @babel/preset-react

  ...
  query: {
          presets: [['@babel/preset-env'],['@babel/preset-react', {"runtime": "automatic"}]],
    ...
```

> i was previously using @babel/react in webpack.config
> i changed @babel/react to @babel/preset-react
> i added {"runtime": "automatic"}

#### [resolve alias in webpack](https://issueexplorer.com/issue/facebook/react/20235)   

```
  ...

  resolve: {alias: {
  'react/jsx-runtime': require.resolve('react/jsx-runtime')
  }}

  ...
```

> idk if both fixed the issue or if adding resolve: to webpack did the job.  just updating the bable presets alone failed.   