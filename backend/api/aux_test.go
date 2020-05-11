package api_test

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/ibraimgm/backend/api"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3" // needed to load sqlite3 driver
)

type httpTest struct {
	testName string
	url      string
	params   []interface{}
	body     string

	expectedStatus int
	expectedBody   string

	engine *gin.Engine
	db     *sqlx.DB
}

func withServer(t *testing.T, tests []httpTest, fn func(t *testing.T, test httpTest)) {
	withDB(func(db *sqlx.DB) {
		// setup the schema and sample data
		script := testData("testdb.sql")
		commands := strings.Split(script, ";")

		for _, cmd := range commands {
			cmd = strings.TrimSpace(cmd)

			if cmd == "" {
				continue
			}

			if _, err := db.Exec(cmd); err != nil {
				panic(err)
			}
		}

		//  setup routes
		r := gin.Default()
		gin.SetMode(gin.ReleaseMode) // used to reduce the output on errors
		api.NewServer(db, r)

		for i := range tests {
			test := tests[i]
			test.engine = r
			test.db = db

			t.Run(test.testName, func(t *testing.T) {
				fn(t, test)
			})
		}
	})
}

func withDB(handler func(db *sqlx.DB)) {
	// Please see https://www.sqlite.org/inmemorydb.html
	//
	// Look for the section "In-memory Databases And Shared Cache" to understand why
	// the url cannot be a simple ":memory:"
	db, err := sqlx.Open("sqlite3", "file:memdb?mode=memory&cache=shared")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	handler(db)
}

func (tc *httpTest) run() error {
	var method string
	switch {
	case strings.Contains(tc.testName, "[POST]"):
		method = http.MethodPost
	case strings.Contains(tc.testName, "[PUT]"):
		method = http.MethodPut
	case strings.Contains(tc.testName, "[DELETE]"):
		method = http.MethodDelete
	default:
		method = http.MethodGet
	}

	if tc.expectedStatus == 0 {
		tc.expectedStatus = http.StatusOK
	}

	// mount the url
	addr := tc.url
	if len(tc.params) > 0 {
		addr = fmt.Sprintf(tc.url, tc.params...)
	}

	// load the body
	var payload io.Reader
	if tc.body != "" {
		payload = strings.NewReader(tc.body)
	}

	// run the request and record the result
	req := httptest.NewRequest(method, addr, payload)
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	tc.engine.ServeHTTP(rec, req)

	// ensure the status code is the expected one
	if rec.Code != tc.expectedStatus {
		return fmt.Errorf("expected status '%d', but received '%d'", tc.expectedStatus, rec.Code)
	}

	// get the expected and the actual body
	expected := strings.TrimSpace(tc.expectedBody)
	body := strings.TrimSpace(rec.Body.String())

	// removes autoinc values
	handleID("id", &expected, body)

	if body != expected {
		return fmt.Errorf("expected body to be '%s', but it was '%s'", expected, body)
	}

	return nil
}

// Remove the concrete valur from the id field, since we cannot know
// the exact value in advance
func handleID(fieldName string, expected *string, actual string) {
	field := `"` + fieldName + `":`

	if !strings.Contains(*expected, field+"?") {
		return
	}

	start := strings.Index(actual, field)
	if start == -1 {
		return
	}

	start += len(field)
	end := strings.IndexRune(actual[start+1:], '"')
	substr := actual[start : end+start]

	*expected = strings.Replace(*expected, field+"?", field+substr, 1)
}

func testData(filename string) string {
	f, err := os.Open("testdata/" + filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic(err)
	}

	return string(b)
}
