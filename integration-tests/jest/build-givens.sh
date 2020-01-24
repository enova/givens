#!/bin/bash
cd ./../../
npm pack
for f in *.tgz; do
    mv $f integration-tests/jest/givens.tgz
done