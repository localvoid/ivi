#!/usr/bin/env -S just --justfile

export PATH := justfile_directory() + "/node_modules/.bin/:" + env_var('PATH')
set shell := ["bash", "-cu"]

_default:
  @just --list -u

mod napi

init:
  bun install

test:
  bun test tests/runtime/

tsc *FLAGS:
  tsc -b {{FLAGS}}

_pkg-set-version dir ver:
  echo "$(jq --arg v "{{ver}}" '.version = $v' {{dir}}/package.json)" > {{dir}}/package.json

_pkg-publish dir *NPM_FLAGS:
  #!/usr/bin/env bash
  set -euo pipefail;
  cd {{dir}}
  if [ "$(npm --no-workspaces view $(jq -r .name package.json) version)" != "$(jq -r .version package.json)" ]; then
    filename="${PWD}/archive.tgz"
    bun pm pack --filename ${filename}
    npm --no-workspaces publish ${filename} {{NPM_FLAGS}}
    rm -rf ${filename}
  fi
