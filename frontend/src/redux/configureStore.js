import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import product from './modules/product';

const rootReducer = combineReducers({ product });

export default () => createStore(rootReducer, applyMiddleware(thunk));
