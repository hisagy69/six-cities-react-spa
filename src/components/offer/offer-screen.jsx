import React, {useEffect} from 'react';
import Gallery from './gallery';
import Header from '../header';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';
import Map from '../map/map';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/action';
import {hotel, nearby} from '../../api-actions';
import Spinner from '../spinner';
import Page404 from '../404/page404';
const OfferScreen = (props) => {
  useEffect(() => {
    props.onLoadData(props.offerId);
  }, [props.offerId]);

  if (props.notFound) {
    return <Page404/>;
  }

  if (!props.isHotelLoad || !props.isHotelNearbyLoad) {
    return <Spinner/>;
  }
  return <div className="page">
    <Header/>
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              props.hotel.images.map((image, i) => (
                <Gallery image={image} key={i}/>
              ))
            }
          </div>
        </div>
        <Property {...props.hotel} isPremium={props.hotel.is_premium} isFavorite={props.hotel.is_favorite} maxAdults={props.hotel.max_adults} reviews={props.reviews} id={props.offerId} onButtonClick={props.onButtonClick}/>
        <section className="property__map map"><Map offers={props.hotelNearby} activeId={props.activeId}/></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {props.hotelNearby && props.hotelNearby.map((offer) => {
              return <NearPlaces {...offer} isPremium={offer.is_premium} isFavorite={offer.is_favorite} previewImage={offer.preview_image} onIdMarker={props.onIdMarker} key={offer.id} onButtonClick={props.onButtonClick}/>;
            })}
          </div>
        </section>
      </div>
    </main>
  </div>;
};
OfferScreen.propTypes = {
  reviews: PropTypes.array,
  activeId: PropTypes.string,
  onIdMarker: PropTypes.func.isRequired,
  isHotelLoad: PropTypes.bool,
  isHotelNearbyLoad: PropTypes.bool,
  onLoadData: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  notFound: PropTypes.bool,
  hotel: PropTypes.object,
  hotelNearby: PropTypes.array,
  onButtonClick: PropTypes.func.isRequired
};
const mapDispatchToProps = (dispatch) => ({
  onLoadData(id) {
    dispatch(hotel(id));
    dispatch(nearby(id));
  },
  onIdMarker(id) {
    dispatch(ActionCreators.setId(id));
  }
});
const mapStateToProps = (state) => ({
  hotel: state.hotel,
  isHotelLoad: state.isHotelLoad,
  hotelNearby: state.hotelNearby,
  isHotelNearbyLoad: state.isHotelNearbyLoad,
  notFound: state.notFound
});
export {OfferScreen};
export default connect(mapStateToProps, mapDispatchToProps)(OfferScreen);
