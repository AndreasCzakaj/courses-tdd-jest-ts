# ex12-misc

Miscellaneous examples:

* `funwithflags`: "Fun With Flags", a coding task for the decorator pattern
* `main.ts`: the "app" for the CI/CD pipeline, prints a UUID

# Initially, after cloning

``` Bash
nvm use     # optional, if you use nvm
npm i
```

# Daily use

## Run tests once, with coverage

``` Bash
npm run test
```

## Run tests continuously ("w" for "watch mode"), TDD style

``` Bash
npm run wtest
```

## Build the "app" and its Docker image

``` Bash
npm run build                                       # bundles src/main.ts into dist/main.js
node dist/main.js                                   # prints a UUID
docker build -f Dockerfile.app -t tdd-jest-ts .
docker run --rm tdd-jest-ts
```
