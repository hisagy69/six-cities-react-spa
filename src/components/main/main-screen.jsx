import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Map from '../map/map';
import {ActionCreators} from '../../store/action';
import {connect} from 'react-redux';
import sorts from '../../selectors/sorts';
import SortOptions from './sort-options';
import {fetchOffersLoad} from '../../api-actions';
import Spinner from '../spinner';
import Header from '../header';
import Tab from './tab';
import OfferList from './offer-list';
const MainScreen = (props) => {
  useEffect(() => {
    if (!props.isDataLoaded) {
      props.onLoadData();
    }
  }, [props.isDataLoaded]);
  if (!props.isDataLoaded) {
    return <Spinner/>;
  }
  const offers = sorts(props.sort, props.cards.filter((card) => card.city.name === props.city));
  const locations = props.cards.reduce((obj, card) => {
    obj[card.city.name] = card.city.name;
    return obj;
  }, {});
  return <React.Fragment>
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                Object.keys(locations).map((location) => <Tab key={location} location={location} active={props.city === location} onCityEnter={props.onCityEnter} cards={props.cards}/>)
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {props.city}</b>
              <SortOptions onSort={props.onSort} sort={props.sort}/>
              <OfferList offers={offers} onButtonClick={props.onButtonClick}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} activeId={props.activeId}/>
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
  cards: state.cards,
  sort: state.sort,
  activeId: state.id,
  isDataLoaded: state.isDataLoaded,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersLoad());
  },
  onCityEnter(city, cards) {
    dispatch(ActionCreators.setCity(city));
    dispatch(ActionCreators.setOffers(cards.filter((card) => card.city.name === city)));
  },
  onSort(sort) {
    dispatch(ActionCreators.setSort(sort));
  }
});
MainScreen.propTypes = {
  offers: PropTypes.array,
  cards: PropTypes.array,
  city: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  activeId: PropTypes.number,
  isDataLoaded: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onCityEnter: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
