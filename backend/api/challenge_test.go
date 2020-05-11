package api_test

import (
	"testing"
)

func TestGetPrices(t *testing.T) {
	tests := []httpTest{
		{testName: "[GET] Normal", url: "/prices", expectedBody: testData("GetPrices.out")},
		{testName: "[GET] By ID", url: "/prices/5", expectedBody: testData("GetOnePrice.out")},
		{testName: "[GET] Not exists", url: "/prices/999", expectedBody: `{}`},
	}

	withServer(t, tests, func(t *testing.T, test httpTest) {
		if err := test.run(); err != nil {
			t.Fatal(err)
		}
	})
}
