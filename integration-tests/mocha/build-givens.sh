#!/bin/bash
cd ./../../
npm pack
for f in *.tgz; do
    mv $f integration-tests/mocha/givens.tgz
done