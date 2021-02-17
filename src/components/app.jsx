import React from 'react';
import Main from './main/main';
import Login from './login/login';
import Offer from './offer/offer';
import Favorites from './favorites/favorites';
import Page404 from './404/page404';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
const App = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Main cards={props.cards} locations={props.locations}/>
      </Route>
      <Route path="/login" exact component={Login}/>
      <Route path="/favorites" exact component={Favorites}/>
      <Route path="/offer/:id?" exact render={(renderProps) => {
        const offerId = renderProps.match.params.id;
        const offer = props.cards.find((card) => card.id === offerId);
        return <Offer offer={offer} cards={props.cards}/>;
      }}/>
      <Route component={Page404}/>
    </Switch>
  </BrowserRouter>;
};
App.propTypes = {
  cards: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired
};
export default App;
