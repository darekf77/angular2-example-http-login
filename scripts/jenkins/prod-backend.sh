sh scripts/jenkins/start.sh $1
export LIVE_BACKEND=true
export ENV="production"
npm run build:prod
rm app_version.txt
rm app_branch.txt
sh scripts/jenkins/stop.sh
