sh scripts/jenkins/start.sh $1
export LIVE_BACKEND=false
export ENV="production"
npm run build:prod
echo $1 > dist/git_info.txt
export DISPLAY=:1
karma start
node ../feature-downloader-stage/bin/scripts/download-to-folder.js https://drive.google.com/open?id=0ByY4lBC2CsctcVdhNGdRaGVubzQ `pwd`/features/files 
cp config/protractor.conf-server.js config/protractor.conf.js
export DISPLAY=:1
npm run e2e > e2e.output.log
sh scripts/jenkins/stop.sh
