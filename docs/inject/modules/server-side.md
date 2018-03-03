!!! tip
    Server-side execution allows you to run NodeJS snippets directly in your modules javascript file, similiar to PHP.

## Example
In the below example [Lodash](https://lodash.com) is used server-side to search for an object and generate a random number. The output of the commands is then directly available to the hooked browser.

!!! example "Module source code"
      ```javascript
      let activeUser = $(_.find([
        { 'user': 'barney',  'age': 36, 'active': true },
        { 'user': 'fred',    'age': 40, 'active': false },
        { 'user': 'pebbles', 'age': 1,  'active': true }
      ], 'active'))
      console.log(activeUser)

      let randomNumber = $(_.random(100))
      ```
!!! example "Parsed module output"
      ```javascript
      let activeUser = { 'user': 'barney',  'age': 36, 'active': true }
      console.log(activeUser)

      let randomNumber = 46
      ```

## Use cases

- Minimize network traffic between the server and client
    - Large libraries don't need to be sent to the client
    - CPU intensive calculations can be performed on the server
- Perform web requests without worrying about CORS
- Randomize the modules actions to prevent reverse-engineering
- Run shell commands on the server

## Is it secure?
Yes. The only way for server-side code to be executed is by placing it in the modules `bundle.js`. Code cannot be changed at processing time.


## Executing methods


### Dynamic functions
Dynamic functions are expressed as normal javascript functions, they are evaluated in the same process as the server (and have access to all the same variables)

!!! example "Module source code"
      ```javascript
      let data = $(() => {
        return {
          time: +new Date()
        }
      })
      ```
!!! example "Parsed module output"
      ```javascript
      let data = {
        time: 1519686807571
      }
      ```

---

### Fixed functions
Fixed functions are expressed as strings and are useful to prevent Webpack conflicts and Typescript errors (eg. `require()` being converted to `__webpack_require__`)

!!! example "Module source code"
      ```javascript
      console.log(`Here's some info about the server:`, $($(`
        const os = require('os')
        return {
          platform: os.platform(),
          uptime: os.uptime(),
        }
      `)))
      ```
!!! example "Parsed module output"
      ```javascript
      console.log(`Here's some info about the server:`, {
        platform: 'xx',
        uptime: 1.00,
      })
      ```

---

### Returning values
#### Objects
Instead of creating a function and returning a value, you can directly use objects, strings and numbers

!!! example "Module source code"
      ```javascript
      let data = $({
        time: +new Date()
      })
      ```
!!! example "Parsed module output"
      ```javascript
      let data = {
        time: 1519686807571
      }
      ```

---

#### Strings & numbers

!!! example "Module source code"
      ```javascript
      let string = $("test")
      let time = $(+new Date())
      ```
!!! example "Parsed module output"
      ```javascript
      let string = "test"
      let time = 1519686807571
      ```

---

## Example scripts

### Run shell commands

!!! example "Module source code"
      ```javascript
      console.log($(shell.exec('echo Hello from the command line!'))
      ```