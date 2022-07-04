import React, {useEffect} from "react";
import Gallery from './gallery';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';
import Map from '../map/map';
import {connect} from 'react-redux';
import {hotelLoadStart, hotelNearbyLoadStart, setId} from '../../store/action';
import {hotel, nearby} from '../../api-actions';
import {getHotel, getStatusHotelLoad, getHotelNearby, getStatusHotelNearbyLoad, getStatusPageLoad} from '../../store/hotel/selectors';
import Spinner from '../spinner';
import Page404 from '../404/page404';
const Offer = (props) => {
  const limitImages = 6;
  useEffect(() => {
    props.onLoadData(props.offerId);
  }, [props.offerId]);
  if (props.notFound) {
    return <Page404/>;
  }
  if (!props.isHotelLoad || !props.isHotelNearbyLoad) {
    return <Spinner/>;
  }
  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {props.hotel && props.hotel.images.map(
                (image, i) => i < limitImages && <Gallery image={image} key={i} />
            )}
          </div>
        </div>
        <Property id={props.offerId} onButtonClick={props.onButtonClick} />
        <section className="property__map map">
          <Map offers={[...props.hotelNearby, props.hotel]}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            {props.hotelNearby &&
              props.hotelNearby.map((offer) => {
                return (
                  <NearPlaces
                    {...offer}
                    isPremium={offer.is_premium}
                    isFavorite={offer.is_favorite}
                    previewImage={offer.preview_image}
                    key={offer.id}
                    onButtonClick={props.onButtonClick}
                  />
                );
              })}
          </div>
        </section>
      </div>
    </main>
  );
};
const mapStateToProps = (state) => ({
  hotel: getHotel(state),
  isHotelLoad: getStatusHotelLoad(state),
  hotelNearby: getHotelNearby(state),
  isHotelNearbyLoad: getStatusHotelNearbyLoad(state),
  notFound: getStatusPageLoad(state)
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData(id) {
    dispatch(hotelLoadStart());
    dispatch(hotel(id));
    dispatch(hotelNearbyLoadStart());
    dispatch(nearby(id));
    dispatch(setId(id));
  }
});
Offer.propTypes = {
  isHotelLoad: PropTypes.bool.isRequired,
  isHotelNearbyLoad: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  notFound: PropTypes.bool,
  hotel: PropTypes.shape(hotelProp),
  hotelNearby: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  onButtonClick: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
export {Offer};
