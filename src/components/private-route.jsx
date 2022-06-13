import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../const';
import Routes from './enum';
import PropTypes from 'prop-types';
import Spinner from './spinner';
const {LOGIN} = Routes;
const PrivateRoute = ({render, path, exact, authorizationStatus, isLoadStatus}) => (
  !isLoadStatus ?
    <Spinner/> :
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.AUTH ?
          render(routeProps) :
          <Redirect to={LOGIN}/>
      )}
    />
);
PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  isLoadStatus: PropTypes.bool.isRequired
};
const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus,
  isLoadStatus: USER.isLoadStatus
});
export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
