# What are modules

## Description

Modules are Javascript files that can be dynamically loaded from the server and executed on the client - with features such as parameters, callbacks and Typescript typings support.

???+ example

    By executing `#!js injectify.module('example', 'test')`, a request will be sent to load a module named `example` with the parameters of `test`.

    This module is then parsed by the server and if the module contains server-side snippets, the server will execute them. Once complete, the server will send the module over to the client where it will be executed.

    The module can run a variety of server-side snippets, including:

    - Shell commands
    - Functions - `require()` supported
    - Calculations

## Tools

### Webpack

All modules are preprocessed by [webpack](https://webpack.js.org/) into a single `bundle.js`. Webpack allows you to import NPM modules, create modular scripts and include local resources.

???+ info "Webpack imports"

    ![Import statements](https://i.imgur.com/GBFvU9N.png)

### Typescript (Optional)

You can use Typescript to write next generation ES7 and have it compile to older-browser compatible javascript. All the necessary typings have been created & documented for you, so you can fully utilize the Injectify API

???+ info "VS Code intellisense"

    ![Typings](https://i.imgur.com/fRgAv4D.png)

## Features

### Developer-first experience

Injectify was built to be super easy to customize hence the reason to use NodeJS (instead of a lower-level langauge such as Java or C++).

The developer experience whilst developing modules is performant and easy to debug, all the below features are available when the client connects via debug mode

- Source code is un-minfified - viewable in the DevTools sources pane
- Verbose console output - module calls, stack traces etc.
- Hot reloading - each time you make a change, the core is reloaded without the page reloading
- Websocket inspection - request JSON inspectable

???+ info "Devtools enhancements"
    ![Devtools](https://i.imgur.com/7X8CTBe.gif)
