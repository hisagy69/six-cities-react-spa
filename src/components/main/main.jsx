import React, {useEffect, useMemo} from "react";
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';
import Map from '../map/map';
import MainEmpty from './main-empty';
import {setCity, setSort} from '../../store/action';
import {connect} from 'react-redux';
import sorts from '../../selectors/sorts';
import SortOptions from './sort-options';
import {fetchOffersLoad} from '../../api-actions';
import {getCityOffers, getCards, getSortOffers, getIsDataLoaded} from '../../store/offers/selectors';
import Spinner from '../spinner';
import Tab from './tab';
import OfferList from './offer-list';
const Main = (props) => {
  useEffect(() => {
    if (!props.isDataLoaded) {
      props.onLoadData();
    }
  }, [props.isDataLoaded]);
  const offers = useMemo(
      () => props.cards && sorts(props.sort, props.cards.filter((card) => card.city.name === props.city)),
      [props.sort, props.city, props.cards]
  );
  const locations = useMemo(() => {
    if (!props.cards) {
      return false;
    }
    const cities = props.cards.reduce((obj, card) => {
      obj[card.city.name] = card.city.name;
      return obj;
    }, {});
    return Object.keys(cities).sort();
  }, [props.isDataLoaded]);
  if (!props.isDataLoaded) {
    return <Spinner />;
  }
  return <main className={offers.length === 0 ?
    `page__main page__main--index page__main--index-empty` :
    `page__main page__main--index`}>
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((location) => (
            <Tab
              key={location}
              location={location}
              active={props.city === location}
              onCityEnter={props.onCityEnter}
            />
          ))}
        </ul>
      </section>
    </div>
    {
      offers.length === 0 ?
        <MainEmpty city={props.city}/> :
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {props.city}
              </b>
              <SortOptions onSort={props.onSort} sort={props.sort} />
              <OfferList offers={offers} onButtonClick={props.onButtonClick} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} />
              </section>
            </div>
          </div>
        </div>
    }
  </main>;
};
const mapStateToProps = (state) => ({
  city: getCityOffers(state),
  cards: getCards(state),
  sort: getSortOffers(state),
  isDataLoaded: getIsDataLoaded(state),
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersLoad());
  },
  onCityEnter(city) {
    dispatch(setCity(city));
  },
  onSort(sort) {
    dispatch(setSort(sort));
  }
});
Main.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  city: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCityEnter: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
export {Main};
