This repo contains separate independent project folders.

`cd` into the desired project and follow the README there.

Branch `main` contains the exercises. Branch `solution` contains the solutions for `ex01-hello`, `ex02-matchers`, `ex11-fibonacci` and `ex12-misc`.

# CI/CD

`.gitlab-ci.yml` defines the GitLab pipeline for the exercises `ex01-hello`, `ex02-matchers`, `ex11-fibonacci` and `ex12-misc`:
lint => test => build => package

* **lint**: ESLint, any violation breaks the build (rules: `eslint.config.js`).
  The linter is the only tool in the root folder: `npm install`, then `npm run lint`
* **test**: all tests with coverage, 1 job per exercise, less than 90% breaks the build
* **build**: bundles the "app" of `ex12-misc` with Vite: `npm run build`
* **package**: builds the Docker image of the "app" (`ex12-misc/Dockerfile.app`), which prints a UUID

On branch `main`, the pipeline is RED by design: the first test must fail.
On branch `solution` it is GREEN.
