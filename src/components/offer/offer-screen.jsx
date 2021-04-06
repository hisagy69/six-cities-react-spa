import React from 'react';
import Gallery from './gallery';
import Header from '../header';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';
import Map from '../map/map';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/action';
const OfferScreen = (props) => {
  return <div className="page">
    <Header/>
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              props.offer.images.map((image, i) => (
                <Gallery image={image} key={i}/>
              ))
            }
          </div>
        </div>
        <Property {...props.offer} isPremium={props.offer.is_premium} isBookmarks={props.offer.is_bookmarks} maxAdults={props.offer.max_adults} reviews={props.reviews}/>
        <section className="property__map map"><Map offers={props.offers} activeId={props.activeId}/></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {props.offers.map((offer) => {
              return <NearPlaces {...offer} isPremium={offer.is_premium} isBookmarks={offer.is_bookmarks} previewImage={offer.preview_image} onIdMarker={props.onIdMarker} key={offer.id}/>;
            })}
          </div>
        </section>
      </div>
    </main>
  </div>;
};
const mapDispatchToProps = (dispatch) => ({
  onIdMarker(id) {
    dispatch(ActionCreators.setId(id));
  }
});
const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.cards.filter((card) => card.city.name === state.city).slice(0, 3),
});
OfferScreen.propTypes = {
  offers: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  reviews: PropTypes.array,
  city: PropTypes.string.isRequired,
  offer: PropTypes.object.isRequired,
  activeId: PropTypes.string,
  onIdMarker: PropTypes.func.isRequired
};
export {OfferScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferScreen);
