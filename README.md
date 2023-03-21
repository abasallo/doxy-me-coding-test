# doxy-me-backend-coding-test

## Requisites

- [Node & NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Configuration

In the project directory, you must copy .env.example as .env, filling missing fields and/or modifying existing ones.

In the project directory, you can run:

### `npm install`

To download dependencies into node_modules directory.

## Available Scripts

In the project directory, you can run:

### `npm run lint`

Runs the linter.

### `npm test`

Launches the runner for Unit & Integration tests.

### `npm run e2e`

Launches the runner for E2E tests.

### `npm start`

Runs the app locally.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

Use [Postman Collection](./doxy.me.postman_collection.json) for details of the API.

After create a user & login with the appropriate endpoint, the token needs to be added to the collection variable with the same name for the authenticated endpoints to work.

### `npm run debug`

Runs the app locally in debug mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.
Connect to [http://localhost:9229](http://localhost:9229) to debug.

Use [Postman Collection](./doxy.me.postman_collection.json) for details of the API.

After create a user & login with the appropriate endpoint, the token needs to be added to the collection variable with the same name for the authenticated endpoints to work.

### `npm run build`

Builds the app to the `build` folder.<br />

### `npm run webpack`

Builds the app as a Lambda to the `build-webpack` folder.<br />

## Docker

### Requirements

- [Docker](https://docs.docker.com/get-docker/).
- [Docker Compose](https://docs.docker.com/compose/install/).

In the project directory, you must copy .env.docker.example as .env.docker, filling missing fields and/or modifying existing ones.

If CONNECTION_URL is omitted in .env.docker, the server defaults to in-memory (SQLite) initialised with sample data.

### `docker-compose up`

Runs containerised using Docker.
