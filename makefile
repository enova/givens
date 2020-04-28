.PHONY: clean clean_integration_tests test prepack

NODE_BIN=./node_modules/.bin/
TSC=$(NODE_BIN)tsc
NPM=npm

SOURCE_NAMES = evaluate getContextInfo getGiven getGivenFunc givenError isValid types

TS_FILE_NAMES = $(addsuffix .ts,$(SOURCE_NAMES))
JS_FILE_NAMES = $(addsuffix .js,$(SOURCE_NAMES))
MAP_FILE_NAMES = $(addsuffix .js.map,$(SOURCE_NAMES))

SOURCE_FILES = $(addprefix src/,$(TS_FILE_NAMES))
TSC_OUT_FILES = $(addprefix build/,$(JS_FILE_NAMES) $(MAP_FILE_NAMES))
DIST_FILES = $(addprefix dist/,$(JS_FILE_NAMES)) dist/getGiven.d.ts

#===============
#     BUILD
#===============
$(TSC_OUT_FILES) &: $(SOURCE_FILES)
	$(TSC)

#===============
#     DIST
#===============
dist :
	mkdir $@

dist/getGiven.d.ts : dist src/getGiven.d.ts
	cp src/getGiven.d.ts dist/getGiven.d.ts

dist/%.js : build/%.js dist
	cp $< $@

prepack : $(DIST_FILES)

#===============
#     PACK
#===============
givens.tgz : $(DIST_FILES)
	$(NPM) pack
	mv givens-*.tgz givens.tgz

package : givens.tgz
	tar zxf givens.tgz

#===============
#     CLEAN
#===============
clean : clean_integration_tests
	rm -f givens.tgz
	rm -rf build dist coverage node_modules package

clean_integration_tests :
	find integration-tests -maxdepth 3 -type d -name 'node_modules' -print0|xargs -0 rm -rf --
