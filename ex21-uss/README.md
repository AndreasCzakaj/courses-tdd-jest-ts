# Initially, after cloning

``` Bash
nvm use     # optional, if you use nvm
npm i
```

# Daily use

2 ways to use it (Jest not supported here because of ESM issue):

## Run vitest tests once, with coverage

``` Bash
npm run test
```

## Run vitest tests continuously ("w" for "watch mode"), TDD style

``` Bash
npm run wtest
```
