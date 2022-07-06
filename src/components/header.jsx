import React, {memo} from 'react';
import PropTypes from 'prop-types';
import userProp from '../props/user.prop';
import {Link} from 'react-router-dom';
import routes from './enum';
import {getUser, getAuthorizationStatus} from '../store/user/selectors';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../const';
const {LOGIN, FAVORITES} = routes;
const Header = (props) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={props.authorizationStatus === AuthorizationStatus.AUTH ? FAVORITES : LOGIN}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                {
                  props.user && props.user.email ? <span className="header__user-name user__name">{props.user.email}</span> :
                    <span className="header__login">Sign in</span>
                }
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};
Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: userProp,
};
const mapStateToProps = (state) => ({
  user: getUser(state),
  authorizationStatus: getAuthorizationStatus(state)
});
export default connect(mapStateToProps, null)(memo(Header, (prevProps, nextProps) => prevProps.authorizationStatus === nextProps.authorizationStatus && prevProps.user === nextProps.user));
export {Header};
