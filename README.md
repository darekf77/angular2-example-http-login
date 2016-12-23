# installation

npm install

# e2e tests

npm run e2e

# unit tests

npm run test

# production version on localhost:3000
# I assume that server on 8080 is sending headers for cross-origin req.

sh scripts/github.sh
http-server -p 3000 dist/
