PKG_DIR := "./packages/@ivi/compiler"

build *FLAGS:
  napi build --platform --esm --manifest-path {{PKG_DIR}}/Cargo.toml --package-json-path {{PKG_DIR}}/package.json --output-dir {{PKG_DIR}} {{FLAGS}}

test:
  bun test ./tests/compiler/

create-npm-dirs:
  napi create-npm-dirs --npm-dir {{PKG_DIR}}/packages --package-json-path {{PKG_DIR}}/package.json

artifacts:
  napi artifacts --npm-dir {{PKG_DIR}}/packages --package-json-path {{PKG_DIR}}/package.json --output-dir ./napi-artifacts

update-versions version:
  just _pkg-set-version {{PKG_DIR}}/packages/darwin-arm64 {{version}}
  just _pkg-set-version {{PKG_DIR}}/packages/darwin-x64 {{version}}
  just _pkg-set-version {{PKG_DIR}}/packages/linux-arm64-gnu {{version}}
  just _pkg-set-version {{PKG_DIR}}/packages/linux-x64-gnu {{version}}
  just _pkg-set-version {{PKG_DIR}}/packages/win32-arm64-msvc {{version}}
  just _pkg-set-version {{PKG_DIR}}/packages/win32-x64-msvc {{version}}

publish *NPM_FLAGS:
  just napi update-versions $(jq -r .version {{PKG_DIR}}/package.json)
  just _pkg-publish {{PKG_DIR}}/packages/darwin-arm64 {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/packages/darwin-x64 {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/packages/linux-arm64-gnu {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/packages/linux-x64-gnu {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/packages/win32-arm64-msvc {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/packages/win32-x64-msvc {{NPM_FLAGS}}
  just _pkg-publish {{PKG_DIR}}/ {{NPM_FLAGS}}
