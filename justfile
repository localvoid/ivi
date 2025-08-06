#!/usr/bin/env -S just --justfile

export PATH := justfile_directory() + "/node_modules/.bin/:" + env_var('PATH')
set shell := ["bash", "-cu"]

_default:
  @just --list -u

mod napi

init:
  pnpm install

tsc *FLAGS:
  tsc -b {{FLAGS}}

_pkg-set-version dir ver:
  echo "$(jq --arg v "{{ver}}" '.version = $v' {{dir}}/package.json)" > {{dir}}/package.json
