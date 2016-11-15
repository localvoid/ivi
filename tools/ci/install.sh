#!/usr/bin/env bash

set -ex -o pipefail

echo 'travis_fold:start:INSTALL'

echo 'travis_fold:start:install.npm-cli-tools'
npm -g install gulp-cli
echo 'travis_fold:end:install.npm-cli-tools'

echo 'travis_fold:start:install.node_modules'
npm install
echo 'travis_fold:end:install.node_modules'

echo 'travis_fold:end:INSTALL'
