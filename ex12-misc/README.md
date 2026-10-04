# ex12-misc

Miscellaneous examples:

* `funwithflags`: "Fun With Flags", a coding task for the decorator pattern
* `main.ts`: the "app" for the CI/CD pipeline, prints a UUID
* `uss`: "User Self Service: Login", the solution of the refactoring task for legacy code (see below)

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

## Build the "app" and its Docker image

``` Bash
npm run build                                       # bundles src/main.ts into dist/main.js
node dist/main.js                                   # prints a UUID
docker build -f Dockerfile.app -t tdd-jest-ts .
docker run --rm tdd-jest-ts
```

# User Self Service: Login (`src/uss`)

The solution of the legacy code task: on branch `main`, `src/uss-dirty/server.ts` does
everything in the handler of the route `/uss/login`. Here, the code is split up and tested:

| File | Kind | What |
|------|------|------|
| `validation.ts` | Operation | syntax of username and password |
| `password.ts` | Operation | hash and verify passwords |
| `user-self-service.ts` | Operation | the login scenarios |
| `controller-utils.ts` | Operation | errors => HTTP status + message |
| `LoginController.ts` | Integration | HTTP request => service => HTTP response |
| `AccountDao.ts` | Boundary | interface to the database, plus fakes for the tests |
| `AccountDaoMongoImpl.ts` | Integration | MongoDB |
| `server.ts` | Integration | wires the parts, defines the route, starts Express |

Scenarios:

* Credentials (username + password) have invalid syntax => 400
  * username: min 8, max 20 chars; `[a-zA-Z0-9\-_]`
  * password: min 12, max 32 chars; `[a-zA-Z0-9\-_.,+]`
* Credentials have valid syntax, but no such username => 401
* Username exists, but wrong password => SAME(!) error 401
* Credentials OK, but account status is not "verified" => 400
* All OK => 200 + session object including account ID, username, email

## Tests

``` Bash
npm run test                    # unit tests (test/): fast, no database, no HTTP
npm run wtest                   # ... continuously
npm run inttest                 # integration tests (test-int/): MongoDB in memory, HTTP server
npm run citest                  # all tests, as in the pipeline
```

The very first run of the integration tests downloads the MongoDB binary.

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
