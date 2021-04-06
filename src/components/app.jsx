import React, {useEffect} from 'react';
import MainScreen from './main/main-screen';
import Login from './login/login';
import OfferScreen from './offer/offer-screen';
import FavoritesScreen from './favorites/favorites-screen';
import Page404 from './404/page404';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Routes from './enum';
import {fetchOffersLoad} from '../api-actions';
import Spinner from './spinner';
const {LOGIN, FAVORITES, OFFER} = Routes;
const App = (props) => {
  useEffect(() => {
    if (!props.isDataLoaded) {
      props.onLoadData();
    }
  }, [props.isDataLoaded]);
  if (props.cards) {
    return <BrowserRouter>
      <Switch>
        <Route path="/" exact render={(renderProps) => {
          return <MainScreen cards={props.cards} locations={props.locations} city={renderProps.match.params.id}/>;
        }}/>
        <Route path={LOGIN} exact component={Login}/>
        <Route path={FAVORITES} exact>
          <FavoritesScreen cards={props.cards}/>
        </Route>
        <Route path={`${OFFER}:id`} exact render={(renderProps) => {
          const offerId = +renderProps.match.params.id;
          const currentOffer = props.cards.find((offer) => offer.id === offerId);
          return <OfferScreen offer={currentOffer} cards={props.cards}/>;
        }}/>
        <Route component={Page404}/>
      </Switch>
    </BrowserRouter>;
  } else {
    return <Spinner/>;
  }
};
const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
  cards: state.cards
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersLoad());
  }
});
App.propTypes = {
  cards: PropTypes.array,
  reviews: PropTypes.array,
  isDataLoaded: PropTypes.bool.isRequired
};
export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
