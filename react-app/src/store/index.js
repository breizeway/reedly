import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import feedReducer from './feeds';
import sidebarReducer from './sidebar';
import sourceReducer from './sources';
import viewsReducer from './views'
import modalReducer from './modal'
import followsReducer from "./follows"

const rootReducer = combineReducers({
    session: sessionReducer,
    feeds: feedReducer,
    sources: sourceReducer,
    sidebar: sidebarReducer,
    views: viewsReducer,
    modal: modalReducer,
    follows: followsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const componseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = componseEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
