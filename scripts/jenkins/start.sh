npm install simple-git
node scripts/app/get-app-ver.js > app_version.txt
echo $1 > app_branch.txt
if [ -d "node_modules/ng2-encrm-components" ]; then
    rm -rf "node_modules/ng2-encrm-components" 
fi
if [ -d "node_modules/bootstrap" ]; then
    rm -rf "node_modules/bootstrap" 
fi
npm install
npm rebuild node-sass
