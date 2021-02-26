import React from 'react';
import MainScreen from './main/main-screen';
import Login from './login/login';
import OfferScreen from './offer/offer-screen';
import Favorites from './favorites/favorites';
import Page404 from './404/page404';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Routes from './enum';
const {LOGIN, FAVORITES, OFFER} = Routes;
const App = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <MainScreen cards={props.cards} locations={props.locations}/>
      </Route>
      <Route path={LOGIN} exact component={Login}/>
      <Route path={FAVORITES} exact component={Favorites}/>
      <Route path={`${OFFER}:id`} exact render={(renderProps) => {
        const offerId = renderProps.match.params.id;
        const offer = props.cards.find((card) => card.id === offerId);
        return <OfferScreen offer={offer} cards={props.cards}/>;
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
