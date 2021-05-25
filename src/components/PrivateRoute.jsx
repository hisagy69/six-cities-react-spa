import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../const';
import Routes from './enum';
import PropTypes from 'prop-types';
const {LOGIN} = Routes;
const PrivateRoute = ({render, path, exact, authorizationStatus}) => (
  <Route
    path={path}
    exact={exact}
    render={(routeProps) => (
      authorizationStatus === AuthorizationStatus.AUTH
        ? render(routeProps)
        : <Redirect to={LOGIN}/>
    )}
  />
);
PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});
export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
