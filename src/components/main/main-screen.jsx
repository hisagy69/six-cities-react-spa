import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header';
import Tab from './tab';
import OfferList from './offer-list';
import PropTypes from 'prop-types';
import Routes from '../enum';
import Map from '../map/map';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
const {FAVORITES} = Routes;
const MainScreen = (props) => {
  return <React.Fragment>
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                props.locations.map((location) => <Tab key={location} location={location} active={props.city === location} onCityEnter={props.onCityEnter}/>)
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{props.offers.length} places to stay in {props.city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <Link to={FAVORITES}><li className="places__option places__option--active" tabIndex="0">Popular</li></Link>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <OfferList cards={props.offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={props.offers}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </React.Fragment>;
};
const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers
});
const mapDispatchToProps = (dispatch) => ({
  onCityEnter(city, offers) {
    dispatch(ActionCreator.cityEnter(city, offers));
  }
});
MainScreen.propTypes = {
  locations: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  onCityEnter: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired
};
export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
