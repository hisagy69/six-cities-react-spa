import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import routes from './enum';
const {LOGIN} = routes;

const Header = (props) => (
  <header className="header">
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
              <Link className="header__nav-link header__nav-link--profile" to={LOGIN}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                {
                  props.login ? <span className="header__user-name user__name">{props.login}</span> :
                    <span className="header__login">Sign in</span>
                }
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
Header.propTypes = {
  login: PropTypes.string
};
export default Header;
