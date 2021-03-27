import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
export const store = createStore(reducer, composeWithDevTools());
ReactDOM.render(
    <Provider store={store}>
      <App cards={cards} locations={location} reviews={reviews}/>
    </Provider>,
    document.getElementById(`root`)
);
