if [ -d "docs" ]; then
    rm -rf "docs" 
    mkdir "docs"
fi
export GITHUB_DEPLOY="account-login" && sh scripts/jenkins/prod-backend.sh
cp -R dist/ docs/
echo "done !"