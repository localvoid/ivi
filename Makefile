init:
	pnpm install

build:
	pnpm run build

build-watch:
	pnpm run build:watch

clean:
	pnpm -r clean
	pnpm run clean

test:
	node --enable-source-maps --test --test packages/**/*.test.js tests/dist/**/*.test.js

test-only:
	node --enable-source-maps --test-only --test packages/**/*.test.js tests/dist/**/*.test.js
