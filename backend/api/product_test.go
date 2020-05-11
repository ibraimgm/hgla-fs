package api_test

import (
	"net/http"
	"testing"

	"github.com/ibraimgm/backend/store"
)

func TestGetProduct(t *testing.T) {
	tests := []httpTest{
		{testName: "[GET] Normal", url: "/product/5", expectedBody: `{"id":5,"name":"Plano P","slug":"planoP"}`},
		{testName: "[GET] Not found", url: "/product/9999", expectedStatus: http.StatusNotFound, expectedBody: `{"message":"Not found"}`},
	}

	withServer(t, tests, func(t *testing.T, test httpTest) {
		if err := test.run(); err != nil {
			t.Fatal(err)
		}
	})
}

func TestInsertProduct(t *testing.T) {
	tests := []httpTest{
		{testName: "[POST] Normal", body: `{"name":"Foo", "slug":"Bar"}`, expectedStatus: http.StatusCreated, expectedBody: testData("InsertProduct.out")},
		{testName: "[POST] No name", body: `{"slug":"Bar"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_NoName.out")},
		{testName: "[POST] No slug", body: `{"name":"Foo"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_NoSlug.out")},
		{testName: "[POST] Duplicated name", body: `{"name":"Plano P", "slug":"Bar"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_Duplicated.out")},
		{testName: "[POST] Duplicated slug", body: `{"name":"Foo", "slug":"planoP"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_Duplicated.out")},
	}

	withServer(t, tests, func(t *testing.T, test httpTest) {
		test.url = "/product"

		if err := test.run(); err != nil {
			t.Fatal(err)
		}
	})
}

func TestUpdateProduct(t *testing.T) {
	tests := []httpTest{
		{testName: "[PUT] Normal", body: `{"name":"Foo", "slug":"Bar"}`, expectedStatus: http.StatusNoContent},
		{testName: "[PUT] No name", body: `{"slug":"Bar"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_NoName.out")},
		{testName: "[PUT] No slug", body: `{"name":"Foo"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_NoSlug.out")},
		{testName: "[PUT] Duplicated name", body: `{"name":"Plano M", "slug":"Bar"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_Duplicated.out")},
		{testName: "[PUT] Duplicated slug", body: `{"name":"Foo", "slug":"planoM"}`, expectedStatus: http.StatusBadRequest, expectedBody: testData("ErrProduct_Duplicated.out")},
		{testName: "[PUT] Not found", url: "/product/999", body: `{"name":"Foo", "slug":"Bar"}`, expectedStatus: http.StatusNotFound, expectedBody: `{"message":"Not found"}`},
	}

	withServer(t, tests, func(t *testing.T, test httpTest) {
		if test.url == "" {
			test.url = "/product/5"
		}

		if err := test.run(); err != nil {
			t.Fatal(err)
		}
	})
}

func TestDeleteProduct(t *testing.T) {
	tests := []httpTest{
		{testName: "[DELETE] Normal", url: "/product/%d", params: []interface{}{5}, expectedStatus: http.StatusNoContent},
		{testName: "[DELETE] Not exists", url: "/product/%d", params: []interface{}{999}, expectedStatus: http.StatusNoContent},
	}

	withServer(t, tests, func(t *testing.T, test httpTest) {
		if err := test.run(); err != nil {
			t.Fatal(err)
		}

		id, ok := test.params[0].(int)
		if !ok {
			t.Fatal("Could not convert ID value")
		}

		prod, err := store.FindProductByID(test.db, id)
		if err != nil {
			t.Fatal(err)
		}

		if prod != nil {
			t.Fatalf("Product %d should not exist on the database!", id)
		}
	})
}
