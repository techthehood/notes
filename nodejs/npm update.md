#### [npm outdated](https://docs.npmjs.com/cli/v6/commands/npm-outdated)   
```
npm outdated
```

_sample output_

**npm outdated**
|Package                          |Current   |Wanted  |Latest  |Location|
|-|-:|-:|-:|-|
|@babel/core                      |   7.5.5|   7.15.0|  7.15.0|  oauth_client
|@babel/plugin-transform-runtime  |   7.9.0|   7.15.0|  7.15.0|  oauth_client
|babel-loader                     |   8.0.6|    8.2.2|   8.2.2|  oauth_client
|css-loader                       |   2.1.1|    2.1.1|   6.2.0|  oauth_client
|exports-loader                   |   0.7.0|    0.7.0|   3.0.0|  oauth_client
|mini-css-extract-plugin          |   0.5.0|    0.5.0|   2.2.0|  oauth_client
|node-sass                        |  4.14.1|   4.14.1|   6.0.1|  oauth_client
|react                            | 16.14.0|  16.14.0|  17.0.2|  oauth_client
|react-dom                        | 16.14.0|  16.14.0|  17.0.2|  oauth_client
|react-scripts                    |   3.1.1|    3.1.1|   4.0.3|  oauth_client
|sass-loader                      |   7.2.0|    7.3.1|  12.1.0|  oauth_client
|style-loader                     |  0.23.1|   0.23.1|   3.2.1|  oauth_client
|webpack                          |  4.39.1|   4.46.0|  5.51.1|  oauth_client
|webpack-bundle-analyzer          |   3.9.0|    3.9.0|   4.4.2|  oauth_client
|webpack-cli                      |  3.3.12|   3.3.12|   4.8.0|  oauth_client
|worker-loader                    |   2.0.0|    2.0.0|   3.0.8|  oauth_client

[fix with npm update](https://docs.npmjs.com/cli/v6/commands/npm-update)   
```
npm update
```

[updating browserlist - why you should do it regularly](https://github.com/browserslist/browserslist#browsers-data-updating)   
> this is a dependency to something. idk what its attached to

*Browserslist: caniuse-lite is outdated. Please run:*

```
  npx browserslist@latest --update-db
```