# Initially, after cloning

``` Bash
nvm use     # optional, if you use nvm
npm i
```

# Daily use

## Run the unit tests once, with coverage

``` Bash
npm run test
```

## Run the unit tests continuously ("w" for "watch mode"), TDD style

``` Bash
npm run wtest
```

## Run the integration tests (MongoDB in memory, HTTP server)

``` Bash
npm run inttest
PORT=3055 npm run inttest       # if port 3000 is taken
LIVE=1 npm run inttest          # also calls the real OData service on the internet
```

## Check the types

Vitest strips the types but does not check them. The TypeScript compiler does:

``` Bash
npm run typecheck
```
