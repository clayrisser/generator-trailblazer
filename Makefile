.PHONY: all
all: clean build

.PHONY: yo
yo: clean_demo build _yo demo/node_modules
_yo: clean_demo build
	@yo trailblazer --destination=demo --name=some-name --description=some-description --product-version=v0.0.1 --author-name=some-author-name --author-email=email@example.com --author-url=example.com --homepage=https://github.com/jamrizzi/trailblazer --template=minimal --database=memory --install=no

demo/node_modules:
	@cd demo && npm install

.PHONY: build
build:
	@rm -rf ./app/*.js
	@node ./node_modules/nwb/lib/bin/nwb build
	@cp -r ./lib/* ./app/
	@echo ::: Built :::

.PHONY: clean_demo
clean_demo:
	-@rm -rf ./demo/*.js ./demo/.dockerignore ./demo/.editorconfig \
		./demo/.eslintrc ./demo/.gitignore ./demo/.eslintignore \
		./demo/api ./demo/config ./demo/test ./demo/views \
		./demo/Dockerfile ./demo/LICENSE ./demo/*.md ./demo/*.yml \
		./demo/*.json &>/dev/null || true

.PHONY: clean
clean:
	@gnore clean
	@node ./node_modules/nwb/lib/bin/nwb clean
	@echo ::: Cleaned :::
