!!! tip
    The Module API allows you to pass parameters, callback functions and utilize the module's global state API.

## Overview

Every time a module is called a new `Module` object is created. This object gives access to the following:

???+ "Getters"
      - The modules current global state
      - The parameters passed to the module.
      - The name the module was called under.
      - A unique token assigned for the call.

???+ "Setters"
      - Resolve / reject the modules Promise callback.
      - Update the modules global state

## Usage

???+ info "Module typings"
    Typescript typings for the `Module` object:
    ```typescript
    Module: {
      /**
       * The name the module was called as
       */
      name: string
      /**
       * The parameters passed to the module
       */
      params: any
      /**
       * Modules global state, persistent until the page is reloaded
       */
      state: any
      /**
       * Updates the module's global state
       * @param newState An object containing the new state
       */
      setState: Function
      /**
       * A unique token generated every time a module is called
       */
      token: string
      /**
       * Resolve the modules calling Promise
       */
      resolve(data?: any): Function
      /**
       * Reject the modules calling Promise
       */
      reject(data?: any): Function
      /**
       * Whether or not the modules callback has been resolved
       */
      resolved: boolean
    }
    ```

## Examples


### Module parameters
The parameters allows you pass data to the module:

!!! example "Calling the module"
      ```javascript
      // Example 1
      injectify.module('example', 'example string')

      // Example 2
      injectify.module('example', { example: 1, doIt: true })
      ```

!!! example "Module source code"
      ```javascript
      // Example 1
      console.log(Module.params) // "example string"

      // Example 2
      console.log(Module.params) // { example: 1, doIt: true }
      ```

---

### Module state
The state allows you to globally store data across module calls:

!!! example "Calling the module"
      ```javascript
      // Example 1
      injectify.module('example')

      // Example 2
      injectify.module('example')
      ```

!!! example "Module source code"
      ```javascript
      if (!Module.state) {
        Module.setState(123)
        console.log(`Set the state to ${Module.state}`)
      } else {
        console.log(`Module state = ${Module.state}`)
      }

      // Example 1: Set the state to 123
      // Example 2: Module state = 123
      ```

---

### Module Promise callback
The callback allows your module to sync / async return data to it's calling Promise.

!!! example "Calling the module"
      ```javascript
      // Example 1
      injectify.module('example').then(data => {
        console.log(data)
      }) // "Returned data"

      // Example 2
      injectify.module('example').then(data => {
      }).catch(err => {
        console.log(err)
      })  // "My error"
      ```

!!! example "Module source code"
      ```javascript
      // Example 1
      Module.resolve('Returned data')

      // Example 2
      Module.reject('My error')
      ```