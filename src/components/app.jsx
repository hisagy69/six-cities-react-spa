import React from 'react';
import MainScreen from './main/main-screen';
import Login from './login/login';
import OfferScreen from './offer/offer-screen';
import FavoritesScreen from './favorites/favorites-screen';
import Page404 from './404/page404';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';
import Routes from './enum';
import browserHistory from '../browser-history';
const {LOGIN, FAVORITES, OFFER} = Routes;
import PrivateRoute from './private-route';
const App = () => {
  return <BrowserRouter history={browserHistory}>
    <Switch>
      <Route path="/" exact render={(renderProps) => {
        return <MainScreen city={renderProps.match.params.id} onButtonClick={() => renderProps.history.push(LOGIN)}/>;
      }}/>
      <PrivateRoute path={FAVORITES} render={() => <FavoritesScreen/>} exact/>
      <Route path={LOGIN} component={Login} exact/>
      <Route path={`${OFFER}:id`} exact render={(renderProps) => {
        const offerId = +renderProps.match.params.id;
        return <OfferScreen offerId={offerId} onButtonClick={() => renderProps.history.push(LOGIN)}/>;
      }}/>
      <Route component={Page404}/>
    </Switch>
  </BrowserRouter>;
};
export default App;
