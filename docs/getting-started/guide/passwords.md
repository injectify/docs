!!! tip
    In order to actually use Injectify, you first have to setup the configuration file. In the future, you'll be able to do this from the web interface.

1. [Clone this repo](git@github.com:samdenty99/injectify.git)
2. Navigate into the repo and copy `server.config.example.js` to `server.config.js`
3. Open `server.config.js` in a text-editor
4. Replace the GitHub `client_id` and `client_secret` values with your newly created applications ones.

    ???+ note "Screenshot of the GitHub configuration"
        <img src="https://i.imgur.com/JId0Wyk.png" alt="GitHub client ID & secret" height="150">
        <img src="https://i.imgur.com/cRcES59.png" alt="server.config.js" height="150">

5. Replace the `mongodb` value with your newly created mLab URL (or dedicated MongoDB URI), in the format:
    ```#!go
    mongodb://<dbuser>:<dbpassword>@XXXX.mlab.com:XXXX/injectify
    ```

    ???+ note "Screenshot of the MongoDB configuration"
        <img src="https://i.imgur.com/UBtGrCh.png" alt="mLab database url" height="90">
        <img src="https://i.imgur.com/TE8DaLj.png" alt="server.config.js" height="90">