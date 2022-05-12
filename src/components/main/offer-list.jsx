import React from 'react';
import Card from './card';
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';

const OfferList = (props) => {
  return <div className="cities__places-list places__list tabs__content">
    {
      props.offers.map((offer) => {
        return <Card key={offer.id} {...offer} isPremium={offer.is_premium} isFavorite={offer.is_favorite} previewImage={offer.preview_image} onButtonClick={props.onButtonClick}/>;
      })
    }
  </div>;
};
OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  onButtonClick: PropTypes.func.isRequired
};
export default OfferList;
export {OfferList};
