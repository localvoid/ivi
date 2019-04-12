VERSION := $(shell git describe --tags --always --dirty="-dev")
DATE := $(shell date -u '+%Y-%m-%d-%H%M UTC')
Q := $(if $(VERBOSE),,@)

all: build

clean: clean_ivi_html clean_ivi_svg clean_ivi clean_ivi_portal clean_ivi_state

build: build_ivi build_ivi_html build_ivi_svg build_ivi_portal build_ivi_state

# ivi-scheduler
clean_ivi_scheduler:
	$Q cd packages/ivi-scheduler && yarn clean

build_ivi_scheduler: clean_ivi_scheduler
	$Q cd packages/ivi-scheduler && yarn dist

# ivi
clean_ivi:
	$Q cd packages/ivi && yarn clean

build_ivi: clean_ivi build_ivi_scheduler
	$Q cd packages/ivi && yarn dist

# ivi-html
clean_ivi_html:
	$Q cd packages/ivi-html && yarn clean

build_ivi_html: clean_ivi_html build_ivi
	$Q cd packages/ivi-html && yarn dist

# ivi-svg
clean_ivi_svg:
	$Q cd packages/ivi-svg && yarn clean

build_ivi_svg: clean_ivi_svg build_ivi
	$Q cd packages/ivi-svg && yarn dist

# ivi-portal
clean_ivi_portal:
	$Q cd packages/ivi-portal && yarn clean

build_ivi_portal: clean_ivi_portal build_ivi
	$Q cd packages/ivi-portal && yarn dist

# ivi-state
clean_ivi_state:
	$Q cd packages/ivi-state && yarn clean

build_ivi_state: clean_ivi_state build_ivi
	$Q cd packages/ivi-state && yarn dist
