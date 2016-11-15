#!/usr/bin/env bash

set -ex -o pipefail

echo 'travis_fold:start:TEST'

# used by xvfb that is used by Chrome
export DISPLAY=:99.0

# Used by karma and karma-chrome-launcher
export CHROME_BIN=/usr/bin/google-chrome

echo 'travis_fold:start:test.run'
sh -e /etc/init.d/xvfb start

gulp lint
gulp compileES6
gulp bundleTests
gulp compileTests

if [[ $TRAVIS_BRANCH = master ]]; then
  gulp runTestsSauce
else
  gulp runTests
fi

if [[ -z $CI_PULL_REQUEST ]]; then
  gulp testCoverage
  bash <(curl -s https://codecov.io/bash)
fi
echo 'travis_fold:end:test.run'

echo 'travis_fold:end:TEST'
