#!/bin/bash
cd ./../../../
npm pack
for f in *.tgz; do
    mv $f integration-tests/typescript/jest/givens.tgz
done