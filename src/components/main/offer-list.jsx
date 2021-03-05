import React, {useState} from 'react';
import Card from './card';
import PropTypes from 'prop-types';

const OfferList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState(0);
  return <div className="cities__places-list places__list tabs__content">
    {
      props.cards.map((cardData) => <Card key={cardData.id} setId={setId} {...cardData}/>)
    }
  </div>;
};
OfferList.propTypes = {
  cards: PropTypes.array.isRequired
};
export default OfferList;
