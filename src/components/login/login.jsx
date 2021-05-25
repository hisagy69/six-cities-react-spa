import React, {useRef} from 'react';
import Header from '../header';
import {connect} from 'react-redux';
import {login} from '../../api-actions';
import {useHistory} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import PropTypes from 'prop-types';
const Login = (props) => {
  const history = useHistory();
  const email = useRef();
  const password = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email.current.value, password.current.value);
    if (props.authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(`/`);
    }
  };
  return <div className="page page--gray page--login">
    <Header/>
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" ref={email} type="email" name="email" placeholder="Email" required=""/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" ref={password} type="password" name="password" placeholder="Password" required=""/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>;
};
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});
const mapDispatchToProps = (dispatch) => ({
  onLogin(email, password) {
    dispatch(login({login: email, password}));
  }
});
export {Login};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
