import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createAPI} from './api';
import {ActionCreators} from './store/action';
import {checkAuth} from './api-actions';
import {AuthorizationStatus} from './const';
const api = createAPI(
    () => store.dispatch(ActionCreators.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);
store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
