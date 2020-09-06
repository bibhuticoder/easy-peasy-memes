rm -r ./docs/assets
cp -r ./src/assets ./docs/assets

cp ./src/extension.html ./docs/extension.html
cp ./src/web.html ./docs/web.html
mv ./docs/web.html ./docs/index.html

cp ./src/background.js ./docs/background.js

cp ./src/popup.html ./docs/popup.html
cp ./src/popup.js ./docs/popup.js
cp ./src/popup.css ./docs/popup.css

cp ./src/manifest.json ./docs/manifest.json
