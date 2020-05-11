import { createStore, combineReducers } from 'redux';
import product from './modules/product';

const rootReducer = combineReducers({ product });

export default () => createStore(rootReducer);
