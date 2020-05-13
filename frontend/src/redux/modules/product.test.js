import axiosMock from 'axios';

import configureStore from '../configureStore';
import * as product from './product';

jest.mock('axios');

test('loadProducts load product data', async () => {
  configMockData();
  const store = configureStore();

  await store.dispatch(product.loadProducts());
  const state = store.getState();

  expect(state.product.list).toHaveLength(1);
  expect(state.product.list[0].name).toEqual('Product1');
  expect(state.product.list[0].prices.valueA).toEqual(764.22);
});

test('calculateValues updates pricing information', async () => {
  configMockData();
  const store = configureStore();

  await store.dispatch(product.loadProducts());
  await store.dispatch(product.calculateValues(12));
  const state = store.getState();

  expect(state.product.list).toHaveLength(1);
  expect(state.product.list[0].name).toEqual('Product1');
  expect(state.product.list[0].prices.valueA).toEqual(286.66);
});

test('getProducts retrieve the correct data', async () => {
  configMockData();
  const store = configureStore();

  await store.dispatch(product.loadProducts());
  const state = store.getState();

  const stateList = state.product.list;
  const selectorList = product.getProducts(state);

  expect(stateList).toHaveLength(1);
  expect(selectorList).toHaveLength(1);
  expect(stateList[0].name).toEqual(selectorList[0].name);
  expect(stateList[0].prices.valueA).toEqual(selectorList[0].prices.valueA);
});

test('getProducts returns empty array when data is missing', () => {
  const list = product.getProducts(undefined);
  expect(list).toBeDefined();
  expect(list).toHaveLength(0);
});

// helper to mock an API call
const configMockData = () => {
  axiosMock.get.mockResolvedValueOnce({
    data: {
      shared: {
        products: {
          product1: {
            id: '1',
            name: 'Product1',
            cycle: {
              annually: {
                months: 12,
                priceOrder: 286.66,
                priceRenew: 286.66,
              },
              monthly: {
                months: 1,
                priceOrder: 29.69,
                priceRenew: 29.69,
              },
              triennially: {
                months: 36,
                priceOrder: 764.22,
                priceRenew: 764.22,
              },
            },
          },
        },
      },
    },
  });
};
