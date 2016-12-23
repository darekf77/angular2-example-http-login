if [ -d "docs" ]; then
    rm -rf "docs" 
    mkdir "docs"
fi
sh scripts/jenkins/prod-backend.sh
cp -R dist/ docs/
echo "done !"