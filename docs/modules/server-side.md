# Server-side snippets

!!! tip

    Server-side execution allows you to run NodeJS snippets directly in your modules javascript file, similiar to PHP.

## Example

In the below example [Lodash](https://lodash.com) is used server-side to search for an object and generate a random number. The output of the commands is then directly available to the hooked browser.

!!! example "Module source code"

      This is what you put in your modules javascript file. When the client requests the module, the server evaluates calls to the `$` class using some magic :sparkles:

      ```javascript
      let activeUser = $.FUNCTION(`
        const _ = require('lodash')
        return _.find([
          { 'user': 'barney',  'age': 36, 'active': true },
          { 'user': 'fred',    'age': 40, 'active': false },
          { 'user': 'pebbles', 'age': 1,  'active': true }
        ], 'active')
      `)
      console.log(activeUser)

      let randomNumber = $(_.random(100))
      ```

!!! example "Parsed module output"

      This is what the server sends back to the client (aka the parsed output)

      ```javascript
      let activeUser = { 'user': 'barney', 'age': 36, 'active': true }
      console.log(activeUser)

      let randomNumber = 46
      ```

## Overview

### Use cases

- Minimize network traffic between the server and client
    - Large libraries don't need to be sent to the client
    - CPU intensive calculations can be performed on the server
- Perform web requests without worrying about CORS
- Randomize the modules actions to prevent reverse-engineering
- Run shell commands on the server

### Is it secure?

Yes. The only way for server-side code to be executed is by placing it in the modules `bundle.js`. Code cannot be changed at processing time.

## Documentation

### Typescript typings

If you are using Typescript, import the typings by adding the following to the top of your `module.ts`

```ts
import ModuleTypings from '../../../definitions/module'
declare const { Module, injectify, $ } : ModuleTypings
```

??? help "Typings for the `$` global class"
      ```ts
      $: {
        /**
         * Performs an expression / function on the server and returns the value. Type checking is disabled
         */
        _(data: Function | String | Object | Number | Boolean | any): any

        /**
         * Executes shell commands on the server and returns output
         * @returns {string} stdout of the command
         */
        SHELL(commands: String): String

        /**
         * Runs a NodeJS code snippet on the server
         * @returns {any} The return value of the function
         */
        FUNCTION(script: String | Function): any

        /**
         * Returns a javascript object populated with server-processed keys
         * Type-checking - If the result is not an object, the module won't execute
         */
        OBJECT(data: String | Object): {[key: string]: any}

        /**
         * Returns a number evaluated from an expression
         * Type-checking - If the result is not a number, the module won't execute
         */
        NUMBER(data: Number | String): Number

        /**
         * Returns a string evaluated from an expression
         * Type-checking - If the result is not a string, the module won't execute
         */
        STRING(data: String): String

        /**
         * Returns a array evaluated from an expression.
         * Type-checking - If the result is not an array, the module won't execute
         */
        ARRAY(data: any[] | string): any[]

        /**
         * Returns a boolean evaluated from an expression.
         * Type-checking - If the result is not an array, the module won't execute
         */
        BOOLEAN(data: boolean | string): boolean

        /**
         * Writes data to the servers filesystem
         */
        WRITE(filename: string, data: string): void
      }
      ```

### Dynamic methods

Dynamic methods are quick and easy to use and suited for most use cases. They allow you to quickly evaluate and return data. They are evaluated in the same process as the server - have access to all the same variables & NodeJS APIs

!!! note
    If you intend to use functions which make use of `require()`, or Typescript is throwing errors, you should use [Fixed Types](#fixed-types)

!!! example "Module source code"

      **Example:**

      ```js
      let bool   = $._(2 > 1)
      let object = $._({ a: 'b' })
      let array  = $._([1,2,3])
      let string = $._('test')
      let func   = $._(() => { return 'func value' }))
      ```

      **Output:**

      ```js
      let bool   = true
      let object = {"a":"b"}
      let array  = [1,2,3]
      let string = "test"
      let func   = "func value"
      ```

### Fixed methods

Fixed types are used when you want to:

- Enhance & prevent typescript errors
- Prevent webpack from transforming the snippets

#### Functions

Fixed functions can be escaped in quotes to prevent Webpack conflicts and Typescript errors (eg. `require()` being converted to `__webpack_require__`)

!!! example "Module source code"

      **Normal:**

      ```js
      let uptime = $.FUNCTION(() => {
       const os = require('os')
       return os.uptime()
      })
      ```

      **Escaped:**

      ```js
      let uptime = $.FUNCTION(`() => {
       const os = require('os')
       return os.uptime()
      }`)
      ```

      **You can also omit the arrow function:**

      ```js
      let uptime = $.FUNCTION(`
       const os = require('os')
       return os.uptime()
      `)
      ```

      **Output:**

      ```js
      let uptime = 4523
      ```

#### Objects & Arrays

!!! example "Module source code"

      **Normal:**

      ```js
      let object = $.OBJECT({
        uptime: process.uptime()
      })
      let array = $.ARRAY([+new Date(), 1+2])
      ```

      **Escaped:**

      ```js
      let object = $.OBJECT(`{
        uptime: process.uptime()
      }`)
      let array = $.ARRAY(`[+new Date(), 1+2]`)
      ```

      **Output:**

      ```js
      let object = {"uptime":4523}
      let array = [1519876291276, 3]
      ```

#### Strings, Numbers & Booleans

!!! example "Module source code"

      **Normal:**

      ```js
      let string = $.STRING(`The Date is ${new Date()}`)
      let number = $.NUMBER(+new Date())
      let boolean = $.BOOLEAN(2 > 1)
      ```

      **Escaped:**

      ```js
      let string = $.STRING("`The Date is ${new Date()}`")
      let number = $.NUMBER(`+new Date()`)
      let boolean = $.BOOLEAN(`2 > 1`)
      ```

      **Output:**

      ```js
      let string = "The Date is Thu Mar 01 2018"
      let number = 1519876291276
      let boolean = true
      ```

#### Shell commands

You can easily perform shell commands on the server and retrieve the standard output stream. Uses [shelljs](https://github.com/shelljs/shelljs) and the synchronous `shelljs.exec()` method

!!! example "Module source code"

      **Source:**

      ```js
      let stdout = $.SHELL(`echo Hello world, the date is ${new Date()}`)
      ```

      **Output:**

      ```js
      let stdout = "Hello world, the date is Sun Mar 04 2018 19:13:40 GMT+0000\r\n"
      ```

#### Filesystem commands

Each module has it's own designated `./data` folder in which you can write and append to files.

!!! example "Module source code"

      **Example:**

      ```js
      $.WRITE(`${injectify.info.ip.query}.txt`, Module.params)
      ```

      Each time the module is called, it will create a text file with the clients IP address as the filename and append the Modules parameters to that file.

### API

#### Runtime variables

Each time the module is called, the server inserts the `injectify` and `Module` methods into the snippet's scope.

This basically means you can seamlessly access client-side variables such as `Module.params` & `injectify.info.ip` etc.

!!! note

    These variables are replicated server-side based on the Injectify API. This means that not all methods exist (eg. `Module.resolve`) and what the client actually has may differ.

!!! example "Module source code"

      **Source:**

      ```js
      console.log($._(injectify.info))
      console.log($._(Module))
      ```

      **Output:**

      ```js
      console.log({
        id: '5dba5160-fb72-4ea6-a9da-d27df1864dc9',
        debug: true,
        project: 'private',
        ip: { query: '127.0.0.1' }
        window: ...,
        devtools: ...,
        socket: ...,
        ...
      })
      console.log({
        name: 'example',
        token: 'b9ab7ae4-538c-53a7-498a-409fb2bf1943'
      })
      ```
