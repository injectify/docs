!!! note
    This is where you actually install Injectify, you are required to have NodeJS pre-installed.

## Prerequisites
* Followed the previous steps
* NodeJS
* Yarn package manager
* (Optional) [A swap file](https://unix.stackexchange.com/a/295852/216455) - reason being that [Webpack uses loads of memory](https://github.com/webpack/webpack/issues/1914)

## Installing
### Windows
```cmd
npm i -g yarn
yarn global add typescript
yarn global add pm2
yarn run install:all
yarn run deploy
```
### Linux
```bash
sudo npm i -g yarn
sudo yarn global add typescript
sudo yarn global add pm2
yarn run install:all
yarn run deploy
```

!!! success
    Injectify will now be running over at [`http://localhost:3000`](http://localhost:3000)