# The image of the "app": prints a new UUID
#   npm run build                                  (creates dist/main.js)
#   docker build -f Dockerfile.app -t tdd-jest-ts .
#   docker run --rm tdd-jest-ts
#
# The bundle is built BEFORE the image, in the pipeline by the job "build".
# => the image contains the bundle only: no sources, no node_modules
FROM node:20-alpine
WORKDIR /app
# .mjs: an ES module, w/out the need for a package.json
COPY dist/main.js ./main.mjs
USER node
ENTRYPOINT ["node", "main.mjs"]
