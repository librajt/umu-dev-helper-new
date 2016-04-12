#!/bin/bash

rm -rf output
fis3 release -f './fis-conf.js' -d './output' -c

cd output/umu-dev-helper
rm  README.md
rm  umu-helper.zip
cd ..
zip -r umu-helper.zip umu-dev-helper