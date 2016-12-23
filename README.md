Demo version
------------

[Demo version link  - gtihub pages](https://darekf77.github.io/account-login/)
company: MaDIFF
username: aaa
password: ddd

installation
------------
Script to build/run production version on localhost:3000
I assume that server on 8080 is sending headers for cross-origin req.

    sh scripts/local.sh

E2E tests
---------

    npm run e2e

Integration / Unit-tests
----------

    npm run test

Development version with mocked data
----------

    npm run server:dev:hmr


