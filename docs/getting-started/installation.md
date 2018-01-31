# Installation

## Requirements
- MongoDB server
- NodeJS
- Yarn package manager
- (Optional) [A swap file](https://unix.stackexchange.com/a/295852/216455) - reason being that [Webpack uses loads of memory](https://github.com/webpack/webpack/issues/1914)

## Creating a MongoDB server
For simplicity, we're going to use [mLab](https://mlab.com) with the Free plan. Though it's recommended to [[setup your own MongoDB server|Development server]] if you plan to have a lot of traffic.

1. Head over to [mLab and create an account](https://mlab.com/signup/) (make sure to verify your email)
2. Click on <kbd>Create new</kbd> in the upper right corner
3. Select <kbd>Sandbox</kbd> and then click <kbd>Continue</kbd><br><br>
![New deployment](https://i.imgur.com/R5F6sd1.png)
4. Select your preferred region and click <kbd>Continue</kbd>
5. Enter `injectify` as the database name, click <kbd>Continue</kbd> and then <kbd>Submit order</kbd>
6. Click on your new database and select <kbd>Users</kbd> and then <kbd>Add database user</kbd><br><br>
![Add database user](https://i.imgur.com/iOB8B4A.png)
7. Choose a username and password and click <kbd>Create</kbd> (make sure `read-only` is left unchecked)

## Creating a GitHub oauth application
1. Create a [new GitHub application](https://github.com/settings/applications/new) with the following values:

| Field                      | Value                        |
|----------------------------|------------------------------|
| Application name           | any                          |
| Homepage URL               | any                          |
| Application description    | any                          |
| Authorization callback URL | `https://injectify.samdd.me` |

<img src="https://i.imgur.com/oiuiMhR.png" alt="GitHub Applications page" height="310">

## Setting up the server
1. Clone this repo
2. Copy `server.config.example.js` to `server.config.js`
3. Replace the GitHub `client_id` and `client_secret` values with your newly created applications ones.
<img src="https://i.imgur.com/JId0Wyk.png" alt="GitHub client ID & secret" height="150">
<img src="https://i.imgur.com/cRcES59.png" alt="server.config.js" height="150">

4. Replace the `mongodb` value with your newly created mLab URL, in the format `mongodb://<dbuser>:<dbpassword>@XXXX.mlab.com:XXXX/injectify`.
<img src="https://i.imgur.com/UBtGrCh.png" alt="mLab database url" height="110">
<img src="https://i.imgur.com/TE8DaLj.png" alt="server.config.js" height="110">

5. Run the following in a terminal at the root of the injectify repo:

```bash
sudo npm i -g yarn
yarn global add typescript
yarn global add pm2
yarn run install:all
yarn run deploy
```
Injectify will now be running over at [`http://localhost:3000`](http://localhost:3000)

[![Analytics](https://ga-beacon.appspot.com/UA-85426772-5/Injectify/?pixel)](https://github.com/igrigorik/ga-beacon)