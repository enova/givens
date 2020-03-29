#!/bin/bash
rm -rf node_modules
rm -f givens.tgz
cd ./../../../
npm pack
for f in *.tgz; do
    mv $f integration-tests/javascript/mocha/givens.tgz
done