import axios from 'axios';
import { sortBy, cloneDeep, each } from 'lodash';

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const LOAD = 'product/LOAD';
const CALCULATE = 'product/CALCULATE';

export const getProducts = (state = {}) => (state.product || {}).list || [];

// action to load the products
export const loadProducts = (initialMonths = 36) => async (dispatch) => {
  const resp = await axios.get(`${apiURL}/prices`);
  const products = (resp.data.shared || {}).products || {};
  let payload = [];

  for (var key in products) {
    const { id, name, cycle } = products[key];
    const basePrice = {};
    const prices = { valueA: 0, valueB: 0, valueC: 0, valueD: 0, discount: 0 };

    for (var cycleName in cycle) {
      const { months, priceOrder, priceRenew } = cycle[cycleName];
      basePrice[months] = { name: cycleName, priceOrder, priceRenew };
    }

    payload.push({ id, name, basePrice, prices });
  }

  // not needed at all, but the UI looks better when
  // showing the prices ordered by the cheapest one
  payload = sortBy(payload, (p) => p.basePrice[1].priceOrder);

  dispatch({ type: LOAD, payload });
  dispatch(calculateValues(initialMonths));
};

// action to recalculate the prices
export const calculateValues = (months, discount = 40) => ({
  type: CALCULATE,
  payload: { months, discount },
});

// products reducer
export default (state = { list: [] }, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, list: action.payload };
    case CALCULATE:
      const { months, discount } = action.payload;
      const newList = cloneDeep([...state.list]);

      each(newList, (product) => {
        const { priceOrder } = product.basePrice[months];

        product.prices.discount = discount;
        product.prices.valueA = priceOrder;
        product.prices.valueB = +(priceOrder * (1 - discount / 100)).toFixed(2);
        product.prices.valueC = +(product.prices.valueB / months).toFixed(2);
        product.prices.valueD = +(
          product.prices.valueA - product.prices.valueB
        ).toFixed(2);
      });

      return { ...state, list: newList };
    default:
      return state;
  }
};
