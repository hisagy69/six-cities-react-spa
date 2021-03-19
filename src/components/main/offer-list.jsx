import React, {useState} from 'react';
import Card from './card';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreators} from '../../store/action';

const OfferList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState(0);
  return <div className="cities__places-list places__list tabs__content">
    {
      props.offers.map((cardData) => {
        return <Card key={cardData.id} setId={setId} {...cardData} onIdMarker={props.onIdMarker} />;
      })
    }
  </div>;
};
OfferList.propTypes = {
  offers: PropTypes.array.isRequired
};
const mapDispatchToProps = (dispatch) => ({
  onIdMarker(id) {
    dispatch(ActionCreators.setId(id));
  }
});
export default connect(null, mapDispatchToProps)(OfferList);
export {OfferList};
