import React from 'react';
import MainScreen from './main/main-screen';
import Login from './login/login';
import OfferScreen from './offer/offer-screen';
import FavoritesScreen from './favorites/favorites-screen';
import Page404 from './404/page404';
import {Switch, Route} from 'react-router-dom';
import Routes from './enum';
const {LOGIN, FAVORITES, OFFER} = Routes;
import PrivateRoute from './private-route';
const App = () => {
  return (
    <Switch>
      <Route path="/" exact render={(renderProps) => {
        return <MainScreen onButtonClick={() => renderProps.history.push(LOGIN)}/>;
      }}/>
      <PrivateRoute path={FAVORITES} render={() => <FavoritesScreen/>} exact/>
      <Route path={LOGIN} component={Login} exact/>
      <Route path={`${OFFER}:id`} exact render={(renderProps) => {
        const offerId = +renderProps.match.params.id;
        return <OfferScreen offerId={offerId} onButtonClick={() => renderProps.history.push(LOGIN)}/>;
      }}/>
      <Route component={Page404}/>
    </Switch>
  );
};
export default App;
