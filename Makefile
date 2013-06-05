SHELL := /bin/bash
PATH  := node_modules/.bin:${PATH}

default: lint test

version = $(shell node -p "require('./package.json').version")

lint:
	@autolint --once

.PHONY: test
test:
	@find test -name "*.js" -type f | xargs -tn1 node

release: default
ifeq (v${version},$(shell git tag -l v${version}))
	@echo "Version ${version} already released!"
	@exit 1
endif
	@echo "Creating tag v${version}"
	@git tag -a -m "Release ${version}" v${version}
	@git push --tags
	@echo "Publishing to npm"
	@npm publish
