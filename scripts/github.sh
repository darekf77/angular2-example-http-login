if [ -d "docs" ]; then
    rm -rf "docs" 
    mkdir "docs"
fi
export GITHUB_DEPLOY="account-login" && sh scripts/jenkins/prod-mock.sh
cp -R dist/ docs/
cp -R coverage/html/ docs/coverage
cp -R test/results/cucumber/ docs/cucumber
echo "done !"