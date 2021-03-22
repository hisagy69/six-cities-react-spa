import React from 'react';
import Card from './card';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/action';

const OfferList = (props) => {
  return <div className="cities__places-list places__list tabs__content">
    {
      props.offers.map((cardData) => {
        return <Card key={cardData.id} {...cardData} onIdMarker={props.onIdMarker} />;
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
  offers: PropTypes.array.isRequired,
  onIdMarker: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(OfferList);
export {OfferList};
