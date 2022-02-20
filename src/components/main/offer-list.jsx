import React from 'react';
import Card from './card';
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/action';

const OfferList = (props) => {
  return <div className="cities__places-list places__list tabs__content">
    {
      props.offers.map((offer) => {
        return <Card key={offer.id} {...offer} isPremium={offer.is_premium} isFavorite={offer.is_favorite} previewImage={offer.preview_image} onIdMarker={props.onIdMarker} onButtonClick={props.onButtonClick}/>;
      })
    }
  </div>;
};
const mapDispatchToProps = (dispatch) => ({
  onIdMarker(id) {
    dispatch(ActionCreators.setId(id));
  }
});
OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  onIdMarker: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(OfferList);
export {OfferList};
