import React from 'react';
import Main from './main/main';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
const App = (props) => {
  return <Main cards={props.cards} locations={props.locations}/>;
};
App.propTypes = {
  cards: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired
};
export default App;
