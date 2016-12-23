sh scripts/jenkins/start.sh $1
export LIVE_BACKEND=false
export ENV="production"
npm run build:prod
sh scripts/jenkins/stop.sh
