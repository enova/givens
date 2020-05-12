.PHONY: clean clean_integration_tests dist package instrument

NODE_BIN=./node_modules/.bin/
BUILD_DIR=build
DIST_DIR=dist
TSC=$(NODE_BIN)tsc
NYC=$(NODE_BIN)nyc
NPM=npm
SOURCE_MAP_URL=npx source-map-url-cli

SOURCE_NAMES = evaluate getContextInfo getGiven getGivenFunc givenError isValid types

TS_FILE_NAMES = $(addsuffix .ts,$(SOURCE_NAMES))
JS_FILE_NAMES = $(addsuffix .js,$(SOURCE_NAMES))
MAP_FILE_NAMES = $(addsuffix .js.map,$(SOURCE_NAMES))

SOURCE_FILES = $(addprefix src/,$(TS_FILE_NAMES))
TSC_OUT_FILES = $(addprefix $(BUILD_DIR)/tsc/,$(JS_FILE_NAMES) $(MAP_FILE_NAMES))
DIST_FILES = $(addprefix dist/,$(JS_FILE_NAMES)) dist/getGiven.d.ts
PACKAGE_FILES = $(addprefix $(BUILD_DIR)/package/,$(DIST_FILES) LICENSE package.json README.md setup.js)
INSTRUMENTED_FILES = $(addprefix $(BUILD_DIR)/instrumented/dist/,$(JS_FILE_NAMES))

#===============
#     BUILD
#===============
$(TSC_OUT_FILES) &: $(SOURCE_FILES) tsconfig.json
	$(TSC)

#===============
#     DIST
#===============
$(DIST_DIR)/getGiven.d.ts : src/getGiven.d.ts
	mkdir -p $(DIST_DIR)
	cp src/getGiven.d.ts $(DIST_DIR)/getGiven.d.ts

$(DIST_DIR)/%.js : $(BUILD_DIR)/tsc/%.js
	mkdir -p $(DIST_DIR)
	$(SOURCE_MAP_URL) remove < $< > $@

dist : $(DIST_FILES)

#===============
#     PACK
#===============
$(BUILD_DIR)/givens.tgz : $(DIST_FILES)
	$(NPM) pack
	mv givens-*.tgz $(BUILD_DIR)/givens.tgz

$(PACKAGE_FILES) &: $(BUILD_DIR)/givens.tgz
	tar zxf $(BUILD_DIR)/givens.tgz -C $(BUILD_DIR)
	for i in build/package/dist/*.js; do\
		[ -f "$$i" ] || break; \
		$(SOURCE_MAP_URL) set -u ../../tsc/$$(basename $$i).map < $$i > $$i.temp; \
		mv -f $$i.temp $$i ;\
	done

package: $(PACKAGE_FILES)

#===============
#     CLEAN
#===============
clean : clean_integration_tests
	rm -rf build dist coverage

clean_integration_tests :
	find test/integration-tests -maxdepth 3 -type d -name 'node_modules' -print0|xargs -0 rm -rf --

clean_manual_tests :
	rm -rf test/manual-tests/node_modules

clean_all : clean clean_integration_tests clean_manual_tests
	rm -rf node_modules