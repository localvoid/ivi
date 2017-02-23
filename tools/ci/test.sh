#!/usr/bin/env bash

set -ex -o pipefail

echo 'travis_fold:start:TEST'

# used by xvfb that is used by Chrome
export DISPLAY=:99.0

# Used by karma and karma-chrome-launcher
export CHROME_BIN=/usr/bin/google-chrome

echo 'travis_fold:start:test.run'
sh -e /etc/init.d/xvfb start

npm run lint

if [[ $TRAVIS_BRANCH = master ]]; then
  ./node_modules/.bin/karma start karma.sauce.conf.js --single-run
else
  ./node_modules/.bin/karma start karma.conf.js --single-run
fi

if [[ -z $CI_PULL_REQUEST ]]; then
  ./node_modules/.bin/karma start karma.coverage.conf.js
  ./node_modules/.bin/codecov
fi
echo 'travis_fold:end:test.run'

echo 'travis_fold:end:TEST'
