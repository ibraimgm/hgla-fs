import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import product from './modules/product';

const rootReducer = combineReducers({ product });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
