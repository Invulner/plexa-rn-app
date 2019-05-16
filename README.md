## Setup

Clone project
```
git clone git@github.com:Invulner/plexa-rn-app.git
```

Go in downloaded directory
```
cd plexa-rn-app
```

#### Add packages

1) install global dependencies
```
npm install expo-cli --global
```

2) download node_modules
```
yarn
```

## Development

1) start
```
yarn start
```
There you can choose how to start project - run on iOS simulator(XCode should be installed), or it can be run on device via QR code scanning.

or you can directly type
```
yarn ios
```
to run iOS simulator

Notes for Debian-based systems && Android:

1) Upgrade to last npm version:
```
npm install -g npm@latest
```
2) If network error on login: Comment condition in NetworkReducer.js:
  return {
    isConnected: true
  }

3) Install expo app on Android 
