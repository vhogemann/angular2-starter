# Angular 2 Starter

## Overview

This is a template that can be reused to create new Angular2 applications, it uses _Gulp_ and _Webpack_. Out of the box you have:

* Angular 2
* Typescript
* Less
* Bootstrap 3
* Font-Awesome

### AngularJS 2

This app uses the [AngularJS 2.x](https://angular.io/) framework. It's a MVC framework to build Sigle Page Applications. Take a look at the following resources to get started:

* [QuickStart](https://angular.io/docs/ts/latest/quickstart.html)
* [Video tutorials](https://egghead.io/courses/angular-2-fundamentals)

### Typescript

Instead of plain JavaScript, we are using [TypeScript](https://www.typescriptlang.org/) to develop the app. From their homepage: "_Typescript is a typed superset of JavaScript that compiles to plain JavaScript_".

Some key features of TypeScript are:

* Statically typed
* Support for Classes, Interfaces and Object Oriented inheritance
* Modules and explicit namespace support
* Generics
* Syntax similar to Java and C#


# Requirements

Before using this template you'll need installed on your system:

* NodeJS >= 5.10.1
* Gulp

The prefered IDE for this project is [Visual Studio Code](https://code.visualstudio.com/), because of it's _TypeScript_ support. 

This repository is set up to use [Git Flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html). It basically means that the main branch is **develop**, and that we work with [_feature branches_](http://nvie.com/posts/a-successful-git-branching-model/). Also, there's a pre-commit hook set up to run tests before any commit, so it takes a while and **commits will fail when there are failing tests!**

If you need to commit even with failing tests, use the **--no-verify** git option:

```bash
$ git commit --no-verify

# or

$ git commit -n
```

# Installation

Before anything you'll need a version of NodeJS installed. If you're on a *Nix environment such as Linux or MacOS use _NVM_:

>   https://github.com/creationix/nvm

If you're on Windows, there's also a version of _NVM_:

> https://github.com/coreybutler/nvm-windows

Also, on Windows you'll want to use _Git Bash_ instead of the regular _PowerShell_ or _CMD_.

## Install the dependencies

```bash
$ npm install -g gulp
$ npm install
```

# Running Unit Tests

Unit tests are written using _Karma_ and _Typescript_. To run them use the following command:

```bash
$ npm test
```

## Debugging Unit tests:

Due to an issue with the plugin that generate the reports, to be able to properly debug the tests with the original source in typescript, first you'll have to comment out the following bit of the **config/webpack.test.js** file:

```javascript
/* comment out the postLoaders to be able to debug Karma with Sourcemaps */
    postLoaders: [
        {
            test: /\.ts$/,
            loader: 'istanbul-instrumenter-loader',
            exclude: [
                'node_modules',
                /\.spec\.ts$/
            ],
            options: {
                embedSource: true
            }
        }
    ]
/* comment out */
```

Now it's just a matter of running the karma server:

```bash
$ npm run debugTest
```

And pointing your browser to:

> http://localhost:9876/debug.html

After you finish debugging don't forget to put the **postLoaders** section back on **config/webpack.test.js**, or the code coverage report will stop working!

## Debugging Unit Tests with Visual Studio code

If you want to debug your tests with *VS Code*, add the following configuration to your *launch.json* file:

```javascript
{
    "type": "chrome",
    "request": "launch",
    "name": "Debug Karma",
    "url": "http://localhost:9876/debug.html",
    "webRoot": "${workspaceRoot}",
    "sourceMaps": true,
    "userDataDir": "${workspaceRoot}/.vscode/chrome"
}
```

# Running End-to-End Tests

The E2E tests are written using [Protractor](http://www.protractortest.org/#/), and are run aggainst the local development server, using mock data.  Also, these tests are written using [_ES6_](http://www.ecma-international.org/ecma-262/6.0/) instead of _Typescript_ due to a protractor limitation.

To run the tests:

```bash
$ gulp protractor
```

## Debugging E2E Tests with Visual Studio Code

You can instead run the protractor tests from within _VS Code_, and have a debbuger attached to it. Just add this to your *lauch.json* file:

```javascript
{
    "type": "node",
    "request": "launch",
    "name": "Protractor Debug",
    "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
    "args": [ "${workspaceRoot}/protractor.conf.js" ],
    "cwd": "${workspaceRoot}"
}
```

Remember to have the _development_ server running before starting protractor from VS Code.

# Running the Application

There are two ways of running this application locally, using the development server: using local mocks _or_ using live endpoints.

## Setting the local environment

The application behaviour regarding which endpoints to use, and other configurations is controlled by the following file:

```
src/config/config.json
```

This file is not in the git repository, and it's dynamicaly copied from one of the other files in the same path:

```
config.development.json
config.production.json
config.mock.json
```

To set the environment you simply pass the **--env=** parameter when running any gulp task. So for example, to run the server using the **development** environment, you would run:

```bash
$ gulp serve --env=development
```

The environment names should match a corresponding config file, always. If you don't pass any parameter the *development* environment is used by default.

## Running with the local Mocks

To run the project pointing to the local mock server simply do:

```bash
$ gulp serve --env=mock
```

The mock server is _always_ running at *http://localhost:*__25000__. There are two places where you can change the mock responses:

These mocks are backed by the [**json-server**](https://github.com/typicode/json-server) npm package. And out of the box offers a REST API following the /:resource/:id pattern, with POST, GET, PUT and DELETE methods implemented. All data is served from the **mock/data.json** file.

The **mock/** directory contains the Json files that are served by the mock server, you can change the files there as you need.
```bash
mock/
    data.json
```

More complex behaviour can be implemented by changing the **config/gulp.mock-server.js** file, there you can add custom enpoints and implement functions to handle the requests. For example, take a look on how to mock a */login* endpoint:

```javascript
'/login' : {
    method : 'post',
    handler : function(req, res) {
        res.cookie('authToken','boogie-woogie');
        var username = req.body.username;
        if( username === 'changepassword' ){
            res.status(401).json( require('../mock/changepassword.json') );
        } else {
            return res.json( require('../mock/login.json') );
        }
    }
}
```

### Debugging with Visual Studio Code

To be able to debug your code on Chrome from VS Code, you first need to install the [**Debugger for Chrome**](https://github.com/Microsoft/vscode-chrome-debug) extension. You can install it directly from VS Code.

And then add the following to your **launch.json** configuration:

```javascript
{
    "type": "chrome",
    "request": "launch",
    "name": "Launch Chrome",
    "url": "http://console.local.mttnow.com/mcw",
    "webRoot": "${workspaceRoot}",
    "userDataDir": "${workspaceRoot}/.vscode/chrome",
    "sourceMaps": true
}
```