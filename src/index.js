import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import cards from './moks/offers';
import location from './moks/location';
import reviews from './moks/reviews';
ReactDOM.render(<App cards={cards} locations={location} reviews={reviews}/>, document.getElementById(`root`));
