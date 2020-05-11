# go commands
GOCMD=go
GOBUILD=$(GOCMD) build

# build flags
override FLAGS += -trimpath
override EXTLDFLAGS +=
LDFLAGS=-ldflags '-w -s -extldflags "$(EXTLDFLAGS)"'

# source locations
SOURCES = go.mod go.sum $(shell find . -name "*.go" | grep -v '_test' | grep -v 'generated_' | grep -v 'pkged.go' | grep -v 'tools')
MIGRATION_SOURCES = $(shell find ./migrations -name "*.sql" )

# final target name
BIN_NAME=backend

all: build

build: $(BIN_NAME)

$(BIN_NAME): $(SOURCES) generate.ok
	env CGO_ENABLED=$(CGO_ENABLED) $(GOBUILD) $(FLAGS) $(LDFLAGS) -o $@

generate.ok: tools.ok generated_swagger/docs.go pkged.go $(SOURCES)
	touch $@

tools.ok: go.mod tools.go
	go install github.com/swaggo/swag/cmd/swag
	go install github.com/cosmtrek/air
	go install github.com/markbates/pkger/cmd/pkger
	touch $@

generated_swagger/docs.go: $(SOURCES)
	go generate

pkged.go: $(MIGRATION_SOURCES)
	pkger -include github.com/ibraimgm/backend:/migrations
