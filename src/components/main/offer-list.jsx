import React from 'react';
import Card from './card';
import PropTypes from 'prop-types';

const OfferList = (props) => {
  return <div className="cities__places-list places__list tabs__content">
    {
      props.cards.map((cardData) => <Card key={cardData.id} {...cardData}/>)
    }
  </div>;
};
OfferList.propTypes = {
  cards: PropTypes.array.isRequired
};
export default OfferList;
