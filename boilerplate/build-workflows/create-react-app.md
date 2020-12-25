# Create react app init

**install Message**
```
  Success! Created react-test at C:\Users\d3pot\version-control\nodejs\react-test
  Inside that directory, you can run several commands:

    npm start
      Starts the development server.

    npm run build
      Bundles the app into static files for production.

    npm test
      Starts the test runner.

    npm run eject
      Removes this tool and copies build dependencies, configuration files
      and scripts into the app directory. If you do this, you can’t go back!

  We suggest that you begin by typing:

    cd react-test
    npm start

  Happy hacking!

```

**initial dependencies**
```
    "dependencies": {
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.5.0",
      "@testing-library/user-event": "^7.2.1",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "react-scripts": "3.4.1"
    },
```

#### what happens when you eject
```
  $ npm run eject
```

**eject message**
```
  ? Are you sure you want to eject? This action is permanent. (y/N) y
? Are you sure you want to eject? This action is permanent. Yes
Ejecting...

Copying files into C:\Users\d3pot\version-control\nodejs\react-test
  Adding \config\env.js to the project
  Adding \config\getHttpsConfig.js to the project
  Adding \config\modules.js to the project
  Adding \config\paths.js to the project
  Adding \config\pnpTs.js to the project
  Adding \config\webpack.config.js to the project
  Adding \config\webpackDevServer.config.js to the project
  Adding \config\jest\cssTransform.js to the project
  Adding \config\jest\fileTransform.js to the project
  Adding \scripts\build.js to the project
  Adding \scripts\start.js to the project
  Adding \scripts\test.js to the project

Updating the dependencies
  Removing react-scripts from dependencies
  Adding @babel/core to dependencies
  Adding @svgr/webpack to dependencies
  Adding @typescript-eslint/eslint-plugin to dependencies
  Adding @typescript-eslint/parser to dependencies
  Adding babel-eslint to dependencies
  Adding babel-jest to dependencies
  Adding babel-loader to dependencies
  Adding babel-plugin-named-asset-import to dependencies
  Adding babel-preset-react-app to dependencies
  Adding camelcase to dependencies
  Adding case-sensitive-paths-webpack-plugin to dependencies
  Adding css-loader to dependencies
  Adding dotenv to dependencies
  Adding dotenv-expand to dependencies
  Adding eslint to dependencies
  Adding eslint-config-react-app to dependencies
  Adding eslint-loader to dependencies
  Adding eslint-plugin-flowtype to dependencies
  Adding eslint-plugin-import to dependencies
  Adding eslint-plugin-jsx-a11y to dependencies
  Adding eslint-plugin-react to dependencies
  Adding eslint-plugin-react-hooks to dependencies
  Adding file-loader to dependencies
  Adding fs-extra to dependencies
  Adding html-webpack-plugin to dependencies
  Adding identity-obj-proxy to dependencies
  Adding jest to dependencies
  Adding jest-environment-jsdom-fourteen to dependencies
  Adding jest-resolve to dependencies
  Adding jest-watch-typeahead to dependencies
  Adding mini-css-extract-plugin to dependencies
  Adding optimize-css-assets-webpack-plugin to dependencies
  Adding pnp-webpack-plugin to dependencies
  Adding postcss-flexbugs-fixes to dependencies
  Adding postcss-loader to dependencies
  Adding postcss-normalize to dependencies
  Adding postcss-preset-env to dependencies
  Adding postcss-safe-parser to dependencies
  Adding react-app-polyfill to dependencies
  Adding react-dev-utils to dependencies
  Adding resolve to dependencies
  Adding resolve-url-loader to dependencies
  Adding sass-loader to dependencies
  Adding semver to dependencies
  Adding style-loader to dependencies
  Adding terser-webpack-plugin to dependencies
  Adding ts-pnp to dependencies
  Adding url-loader to dependencies
  Adding webpack to dependencies
  Adding webpack-dev-server to dependencies
  Adding webpack-manifest-plugin to dependencies
  Adding workbox-webpack-plugin to dependencies

Updating the scripts
  Replacing "react-scripts start" with "node scripts/start.js"
  Replacing "react-scripts build" with "node scripts/build.js"
  Replacing "react-scripts test" with "node scripts/test.js"

Configuring package.json
  Adding Jest configuration
  Adding Babel preset

Running npm install...
audited 931399 packages in 25.063s
found 0 vulnerabilities

Ejected successfully!

```

**eject package.json**
```
  {
    "name": "react-test",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@babel/core": "7.9.0",
      "@svgr/webpack": "4.3.3",
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.5.0",
      "@testing-library/user-event": "^7.2.1",
      "@typescript-eslint/eslint-plugin": "^2.10.0",
      "@typescript-eslint/parser": "^2.10.0",
      "babel-eslint": "10.1.0",
      "babel-jest": "^24.9.0",
      "babel-loader": "8.1.0",
      "babel-plugin-named-asset-import": "^0.3.6",
      "babel-preset-react-app": "^9.1.2",
      "camelcase": "^5.3.1",
      "case-sensitive-paths-webpack-plugin": "2.3.0",
      "css-loader": "3.4.2",
      "dotenv": "8.2.0",
      "dotenv-expand": "5.1.0",
      "eslint": "^6.6.0",
      "eslint-config-react-app": "^5.2.1",
      "eslint-loader": "3.0.3",
      "eslint-plugin-flowtype": "4.6.0",
      "eslint-plugin-import": "2.20.1",
      "eslint-plugin-jsx-a11y": "6.2.3",
      "eslint-plugin-react": "7.19.0",
      "eslint-plugin-react-hooks": "^1.6.1",
      "file-loader": "4.3.0",
      "fs-extra": "^8.1.0",
      "html-webpack-plugin": "4.0.0-beta.11",
      "identity-obj-proxy": "3.0.0",
      "jest": "24.9.0",
      "jest-environment-jsdom-fourteen": "1.0.1",
      "jest-resolve": "24.9.0",
      "jest-watch-typeahead": "0.4.2",
      "mini-css-extract-plugin": "0.9.0",
      "optimize-css-assets-webpack-plugin": "5.0.3",
      "pnp-webpack-plugin": "1.6.4",
      "postcss-flexbugs-fixes": "4.1.0",
      "postcss-loader": "3.0.0",
      "postcss-normalize": "8.0.1",
      "postcss-preset-env": "6.7.0",
      "postcss-safe-parser": "4.0.1",
      "react": "^16.13.1",
      "react-app-polyfill": "^1.0.6",
      "react-dev-utils": "^10.2.1",
      "react-dom": "^16.13.1",
      "resolve": "1.15.0",
      "resolve-url-loader": "3.1.1",
      "sass-loader": "8.0.2",
      "semver": "6.3.0",
      "style-loader": "0.23.1",
      "terser-webpack-plugin": "2.3.5",
      "ts-pnp": "1.1.6",
      "url-loader": "2.3.0",
      "webpack": "4.42.0",
      "webpack-dev-server": "3.10.3",
      "webpack-manifest-plugin": "2.2.0",
      "workbox-webpack-plugin": "4.3.1"
    },
    "scripts": {
      "start": "node scripts/start.js",
      "build": "node scripts/build.js",
      "test": "node scripts/test.js"
    },
    "eslintConfig": {
      "extends": "react-app"
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    },
    "jest": {
      "roots": [
        "<rootDir>/src"
      ],
      "collectCoverageFrom": [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts"
      ],
      "setupFiles": [
        "react-app-polyfill/jsdom"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/src/setupTests.js"
      ],
      "testMatch": [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
      ],
      "testEnvironment": "jest-environment-jsdom-fourteen",
      "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
      },
      "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$"
      ],
      "modulePaths": [],
      "moduleNameMapper": {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
      },
      "moduleFileExtensions": [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
      ],
      "watchPlugins": [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
      ]
    },
    "babel": {
      "presets": [
        "react-app"
      ]
    }
  }
```
