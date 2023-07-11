# Health App

## Prerequisite

- [Node.js](https://nodejs.org): `^16.13.0`
- [Yarn](https://yarnpkg.com/)

## Front-end Stack

- [react](https://react.dev/)
- [vite](https://vitejs.dev/)
- [msw](https://mswjs.io/): API mocking using Service Worker
- [axios](https://axios-http.com/): API caller
- [react-query](https://tanstack.com/query/v3/): API caller and caching management for React Component

## How to run development mode

Duplicate `.env` file and rename to `.env.local`, fill `VITE_USER_EMAIL` and `VITE_USER_PASSWORD` to login later

Run:

```bash
yarn install

yarn dev
```

Logging in using email/password from `VITE_USER_EMAIL`/`VITE_USER_PASSWORD` (default: `admin@gmail.com`/`123456`)

## How to build production

```bash
yarn build

yarn preview # Run production in local
```

## Environment variable

| Env name             | Usage                                            |
| -------------------- | ------------------------------------------------ |
| `VITE_API_ENDPOINT`  | API endpoint (leave it blank to work with `msw`) |
| `VITE_USER_EMAIL`    | User email for login                             |
| `VITE_USER_PASSWORD` | User password for login                          |
