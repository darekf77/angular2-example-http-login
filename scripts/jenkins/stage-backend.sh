sh scripts/jenkins/start.sh $1
export LIVE_BACKEND=true
export ENV="development"
npm run build:dev
sh scripts/jenkins/stop.sh
