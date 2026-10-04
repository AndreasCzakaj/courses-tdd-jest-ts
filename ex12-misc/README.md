# ex12-misc

Miscellaneous examples:

* `funwithflags`: "Fun With Flags", a coding task for the decorator pattern
* `main.ts`: the "app" for the CI/CD pipeline, prints a UUID
* `uss-dirty`: "User Self Service: Login", a refactoring task for legacy code (see below)

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

# User Self Service: Login (`src/uss-dirty`)

`src/uss-dirty/server.ts` implements the login. It works, but everything happens in the
handler of the route `/uss/login`: validation, database calls, error handling.
There are no tests.

Scenarios:

* Credentials (username + password) have invalid syntax => 400
  * username: min 8, max 20 chars; `[a-zA-Z0-9\-_]`
  * password: min 12, max 32 chars; `[a-zA-Z0-9\-_.,+]`
* Credentials have valid syntax, but no such username => 401
* Username exists, but wrong password => SAME(!) error 401
* Credentials OK, but account status is not "verified" => 400
* All OK => 200 + session object including account ID, username, email

## Your task

* Extract functions and classes
* Separate Operation code (logic: validation, password check, decisions) from
  Integration code (HTTP, database)
* Add tests along the way
* Done when: all scenarios are covered by tests, and `npm run lint` in the root folder
  is green (now: "complexity of 18. Maximum allowed is 5")

## Run it

``` Bash
npm run uss                     # MongoDB in memory + some accounts, see the console output
PORT=3055 npm run uss           # if port 3000 is taken
```

``` Bash
curl -i -X POST localhost:3000/uss/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "alice_verified", "password": "Correct-Horse_42"}'
```
