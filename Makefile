# functions

# $(call filter-partials,file-list)
# Removes underscore-prefixed files from file-list
define filter-partials
	$(foreach file,\
		$1,\
		$(eval FILE=$(notdir $(file)))\
			$(if $(FILE:_%=),$(file)))
endef

# $(call get-jshintignore-patterns,file-list)
# Changes .jshintignore entries from file-list into make-compatible patterns
# TODO handle glob pattern
define get-jshintignore-patterns
	$(foreach entry,\
		$1,\
		$(shell test -d "$(entry)" &&\
			echo $(entry:%/=%)/%\
		)\
		$(shell test -f "$(entry)" &&\
			echo $(entry)\
		)\
	)
endef


# file settings

SRC_STATIC_PATH = static/src
BUILD_STATIC_PATH = static

SRC_DJANGO_TEMPLATES_PATH = templates/shared
SRC_DJANGO_TEMPLATES = $(shell find $(SRC_DJANGO_TEMPLATES_PATH) -type f -name '*.html')
SRC_JSTEMPLATES_PATH = $(SRC_STATIC_PATH)/templates
BUILD_DJANGO_TEMPLATES = $(subst \
	$(SRC_DJANGO_TEMPLATES_PATH),\
	$(SRC_JSTEMPLATES_PATH),\
	$(SRC_DJANGO_TEMPLATES:.html=.tpl)\
	)

SRC_JSTEMPLATES = $(shell find $(SRC_JSTEMPLATES_PATH) -type f -name '*.tpl') $(BUILD_DJANGO_TEMPLATES)
BUILD_JSTEMPLATES_PATH = $(SRC_STATIC_PATH)/js/templates
BUILD_JSTEMPLATES = $(subst $(SRC_JSTEMPLATES_PATH),$(BUILD_JSTEMPLATES_PATH),$(SRC_JSTEMPLATES:.tpl=.js))

SRC_JS_PATH = $(SRC_STATIC_PATH)/js
SRC_JS = $(shell find $(SRC_JS_PATH) -type f -name '*.js')
BUILD_JS_PATH = $(BUILD_STATIC_PATH)/js
BUILD_JS = $(addprefix $(BUILD_JS_PATH)/,\
	vendor/require.js\
	main.js\
	)

SRC_SCSS_PATH = $(SRC_STATIC_PATH)/scss
SRC_SCSS = $(shell find $(SRC_SCSS_PATH) -type f -name '*.scss')
BUILD_CSS_PATH = $(BUILD_STATIC_PATH)/css
BUILD_CSS = $(call filter-partials,\
	$(subst $(SRC_SCSS_PATH),$(BUILD_CSS_PATH),$(SRC_SCSS:.scss=.css)))

SRC_SCSS_FONTS = $(SRC_SCSS_PATH)/partials/_fonts.scss
BUILD_FONTS_PATH = $(BUILD_STATIC_PATH)/fonts

SRC_SCSS_VENDOR_PATH = $(SRC_SCSS_PATH)/vendor
SRC_SCSS_VENDOR = $(SRC_SCSS_VENDOR_PATH)/_normalize.scss
SRC_JS_VENDOR_PATH = $(SRC_JS_PATH)/vendor
SRC_JS_VENDOR = $(addprefix $(SRC_JS_VENDOR_PATH)/,\
	backbone.js\
	jquery.js\
	jquery.serialize-object.js\
	require.js\
	swig.js\
	underscore.js\
	)

VENV_DIRECTORY = env
VENV_ACTIVATE = $(VENV_DIRECTORY)/bin/activate

# environment-specific settings

# development
ALL_PREREQUISITES = venv test
KARMA_CONFIG = tests/js/config/karma.conf.js
R.JS_FLAGS = optimize=none
SASS_FLAGS = --style nested --load-path $(SRC_SCSS_PATH)

ifdef PRODUCTION
	ALL_PREREQUISITES =
	BUNDLER_FLAGS = --without development
	NO_COMMENT = ./node_modules/.bin/no-comment $@ $@
	NPM_FLAGS = --production
	R.JS_FLAGS =
	SASS_FLAGS = --style compressed --load-path $(SRC_SCSS_PATH) --sourcemap=none
endif

ifdef CI
    ifdef SAUCE_USERNAME
		KARMA_CONFIG = tests/js/config/karma.sauce.conf.js
    endif

    # sauce connect set to run via travis config
    ifndef TRAVIS
		SAUCECONNECT_RUN = ./node_modules/.bin/sc-run
    endif
endif


# targets

all: $(ALL_PREREQUISITES) build

build: $(BUILD_CSS) $(BUILD_JS)

clean:
	rm -rfv\
		$(BUILD_CSS_PATH)\
		$(BUILD_DJANGO_TEMPLATES)\
		$(BUILD_FONTS_PATH)\
		$(BUILD_JS_PATH)\
		$(BUILD_JSTEMPLATES_PATH)\
		$(SRC_SCSS_FONTS)\

distclean: clean
	rm -rfv\
		$(shell find . -type f -name '*.pyc')\
		$(SRC_JS_VENDOR_PATH)\
		$(SRC_SCSS_VENDOR_PATH)\
		$(VENV_DIRECTORY)\
		.bundle\
		.sass-cache\
		coverage\
		db.sqlite3\
		makedeps\
		node_modules\

lint: lint-js lint-travis
lint-js: makedeps/jshint.d
lint-travis: makedeps/travis-lint.d

migrate: venv
	. $(VENV_ACTIVATE); python manage.py migrate

runserver: venv migrate build
    # --insecure option forces serving of static files if DEBUG=False
	. $(VENV_ACTIVATE); python manage.py runserver 0.0.0.0:8000 --insecure

runserver-webdriver: node_modules selenium-server-jar-file
	./node_modules/.bin/selenium-standalone start

runserver-webdriver-headless: node_modules
	./node_modules/.bin/phantomjs --webdriver=4444

test:\
    lint\
    test-python\
    test-js\
    test-webdriver-headless\

test-js: $(SRC_JS_VENDOR) $(BUILD_JSTEMPLATES) node_modules
	$(SAUCECONNECT_RUN) ./node_modules/karma/bin/karma start $(KARMA_CONFIG)

test-webdriver-local: venv migrate build selenium-server-jar-file
	@ if ! ps -ewwo pid,args | grep [p]ython\ manage.py\ runserver; then\
		make runserver &\
	fi

    # make sure phantomjs ghostdriver isn't running
	@ if ps -ewwo pid,args | grep [n]ode_modules/.bin/phantomjs\ [-][-]webdriver=4444; then\
		pkill phantomjs;\
	fi

	@ if ! ps -ewwo pid,args | grep [n]ode_modules/.bin/selenium-standalone\ start; then\
		make runserver-webdriver &\
	fi

	sleep 3
	./node_modules/.bin/wdio tests/webdriver/config/wdio.local.conf.js

test-webdriver-headless: venv migrate build
	@ if ! ps -ewwo pid,args | grep [p]ython\ manage.py\ runserver; then\
		make runserver &\
	fi

    # make sure selenium server standalone jar isn't running
	@ if ps -ewwo pid,args | grep [n]ode_modules/.bin/selenium-standalone\ start; then\
		kill `ps -wwo pid,args | grep [n]ode_modules/.bin/selenium-standalone\ start | sed 's%\ node\ [.]/node_modules/[.]bin/selenium-standalone\ start%%'`;\
	fi

	@ if ! ps -ewwo pid,args | grep [n]ode_modules/.bin/phantomjs\ [-][-]webdriver=4444; then\
		make runserver-webdriver-headless &\
	fi

	sleep 3
	./node_modules/.bin/wdio tests/webdriver/config/wdio.headless.conf.js

test-python: venv
	. $(VENV_ACTIVATE); python manage.py test
	. $(VENV_ACTIVATE); coverage html --directory=coverage/python --omit=./env/*,./tests/*

venv: $(VENV_ACTIVATE)

# file rules

SASS = $(shell bundle show sass)/bin/sass
$(BUILD_CSS_PATH)/%.css: $(SRC_SCSS_PATH)/%.scss $(SRC_SCSS) $(SRC_SCSS_FONTS) $(SRC_SCSS_VENDOR) makedeps/gemfile.d
	mkdir -p "$(@D)"
	$(SASS) $(SASS_FLAGS) $< $@

$(SRC_JSTEMPLATES_PATH)/%.tpl: $(SRC_DJANGO_TEMPLATES_PATH)/%.html
	cp $? $@

$(BUILD_JSTEMPLATES_PATH)/%.js: $(SRC_JSTEMPLATES_PATH)/%.tpl $(SRC_JSTEMPLATES_PATH)/shared.html node_modules
	mkdir -p "$(@D)"
	./node_modules/.bin/swig compile $<\
		--wrap-start="\
			define(['swig'], function (swig) {\
				return (function (data) {\
					return swig.run(" --wrap-end=", data);\
				});\
			});" > $@

$(BUILD_JS_PATH)/%.js: $(BUILD_JSTEMPLATES) $(SRC_JS_VENDOR) $(SRC_JS) node_modules
	mkdir -p "$(@D)"
	./node_modules/.bin/r.js -o build-config.js $(R.JS_FLAGS) name=$(basename $(@:$(BUILD_JS_PATH)/%=%)) out=$@
	$(NO_COMMENT)

$(BUILD_JS_PATH)/vendor/require.js: node_modules
	mkdir -p "$(@D)"
	./node_modules/.bin/uglifyjs node_modules/requirejs/require.js --output $@

$(SRC_JS_VENDOR_PATH)/backbone.js: node_modules/backbone/backbone.js
$(SRC_JS_VENDOR_PATH)/jquery.js: node_modules/jquery/dist/jquery.js
$(SRC_JS_VENDOR_PATH)/jquery.serialize-object.js: node_modules/form-serializer/jquery.serialize-object.js
$(SRC_JS_VENDOR_PATH)/require.js: node_modules/requirejs/require.js
$(SRC_JS_VENDOR_PATH)/swig.js: node_modules/swig-templates/dist/swig.js
$(SRC_JS_VENDOR_PATH)/underscore.js: node_modules/underscore/underscore.js
$(SRC_SCSS_VENDOR_PATH)/_normalize.scss: node_modules/normalize.css/normalize.css
$(SRC_JS_VENDOR) $(SRC_SCSS_VENDOR):
	mkdir -p "$(@D)"
	cp $? $@

$(SRC_SCSS_FONTS): node_modules
	./node_modules/.bin/webfont-dl\
		"http://fonts.googleapis.com/css?family=Libre+Baskerville:400,700,400italic|Lato:300,400,700"\
		--css-rel=/$(BUILD_FONTS_PATH)\
		--font-out=$(BUILD_FONTS_PATH)\
		--out $@

$(VENV_ACTIVATE): requirements.txt
	test -d $(VENV_DIRECTORY) || virtualenv --no-site-packages --python=$(shell which python3) $(VENV_DIRECTORY)
	. $@; pip install --requirement requirements.txt --upgrade
	touch $@

node_modules: package.json
	npm install $(NPM_FLAGS)
	touch $@
node_modules/%: node_modules
	touch $@

makedeps/gemfile.d: Gemfile
	mkdir -p "$(@D)"
	bundle install $(BUNDLER_FLAGS)
	touch $@

JSHINTIGNORE_ENTRIES = $(shell cat .jshintignore | sed 's/^\s*//' | sed '/^\#/d')
JSHINT_IGNORE_PATTERNS = $(call get-jshintignore-patterns,$(JSHINTIGNORE_ENTRIES))
JSHINT_JS_DEPENDENCIES = $(filter-out $(JSHINT_IGNORE_PATTERNS), $(SRC_JS))
makedeps/jshint.d: .jshintignore .jshintrc $(JSHINT_JS_DEPENDENCIES) node_modules
	mkdir -p "$(@D)"
	./node_modules/.bin/jshint $(SRC_JS_PATH)
	touch $@

makedeps/travis-lint.d: .travis.yml makedeps/gemfile.d
	mkdir -p "$(@D)"
	travis-lint
	touch $@

selenium-server-jar-file: node_modules
	./node_modules/.bin/selenium-standalone install


# performance settings

# turn off built-in implicit rules
MAKEFLAGS = --no-builtin-rules

# delete default suffixes
.SUFFIXES:

# declare phony targets
.PHONY: all build clean distclean lint lint-js lint-travis test
