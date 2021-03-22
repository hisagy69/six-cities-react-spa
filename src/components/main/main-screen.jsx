import React from 'react';
import Header from '../header';
import Tab from './tab';
import OfferList from './offer-list';
import PropTypes from 'prop-types';
import Map from '../map/map';
import {ActionCreators} from '../../store/action';
import {connect} from 'react-redux';
import cards from '../../moks/offers';
import sorts from '../../selectors/sorts';
import SortOptions from './sort-options';
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
              <SortOptions onSort={props.onSort} sort={props.sort}/>
              <OfferList offers={props.offers}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={props.offers} activeId={props.activeId}/>
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
  offers: sorts(state.sort, cards.filter((card) => card.location === state.city)),
  sort: state.sort,
  activeId: state.id
});
const mapDispatchToProps = (dispatch) => ({
  onCityEnter(city) {
    dispatch(ActionCreators.setCity(city));
    dispatch(ActionCreators.setOffers(cards.filter((card) => card.location === city)));
  },
  onSort(sort) {
    dispatch(ActionCreators.setSort(sort));
  }
});
MainScreen.propTypes = {
  offers: PropTypes.array,
  locations: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  onCityEnter: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  activeId: PropTypes.string
};
export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
