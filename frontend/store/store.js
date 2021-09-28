import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../components/reducers/root_reducer';

const configureStore = (preloadedState = {}) => {
   createStore(rootReducer, preloadedState, applyMiddleware(logger, thunk))
}