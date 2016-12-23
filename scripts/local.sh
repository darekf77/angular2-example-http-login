sh scripts/jenkins/prod-backend.sh
node_modules/http-server/bin/http-server -p 3000 dist/
open "http://localhost:3000";
