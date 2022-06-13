import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './store/root-reducer';
import {createAPI} from './api';
import {requiredAuthorization} from './store/action';
import {checkAuth} from './api-actions';
import {AuthorizationStatus} from './const';
const api = createAPI(
    () => store.dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH))
);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
