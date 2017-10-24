# TPP Reference Client

This project contains a
[reference web application](https://github.com/OpenBankingUK/reference-applications/blob/master/tpp-reference-applications.md)
that integrates with the
[Open Banking Read/Write API](https://www.openbanking.org.uk/read-write-apis/)
to retrieve a customer's account balances. The [Vue.js](https://vuejs.org)
application was initially generated using `vue init pwa` to run the
[vue-cli](https://github.com/vuejs/vue-cli) scaffold tool with a
[Progressive Web Apps template](https://github.com/vuejs-templates/pwa).

For more background, read this
[Third Party Provider (TPP) Reference Applications overview](https://github.com/OpenBankingUK/reference-applications/blob/master/tpp-reference-applications.md).

## Build setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit
```

## Running the app locally / integration tests

To run the app and or the integration tests, you must have the following servers
installed and running locally:
* [tpp-reference-server](https://github.com/OpenBankingUK/tpp-reference-server) - provides app API
* [reference-mock-server](https://github.com/OpenBankingUK/reference-mock-server) - mocks ASPSP and OB Directory API endpoints

To the app run locally run:

```bash
# serve with hot reload at localhost:8080, set API base URL with API_BASE_URL
API_BASE_URL=http://localhost:8003/open-banking/v1.1 npm run dev
```

To run the end to end tests run

```bash
# run e2e tests with development configuration for faster startup
TEST=e2e NODE_ENV=development npm run e2e

# run e2e tests with production configuration - slower startup
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deploy to heroku

To deploy to heroku for the first time from a Mac:

```sh
brew install heroku # assumes you have installed: https://brew.sh

heroku login

heroku create --region eu <newname>

heroku config:set API_BASE_URL=https://example.com/open-banking/v1.1

# For now, set NPM_CONFIG_PRODUCTION=false so dev dependencies
# get installed on server by `npm install`.
# We need dev dependencies installed to run `npm run build` to generate
# ./dist directory on server.
heroku config:set NPM_CONFIG_PRODUCTION=false

git push heroku master
```

For more details see: https://devcenter.heroku.com/articles/nodejs-support
