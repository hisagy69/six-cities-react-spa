import React, {memo} from 'react';
import PropTypes from 'prop-types';
const Gallery = (props) => {
  return <div className="property__image-wrapper">
    <img className="property__image" src={props.image} alt="Photo studio"/>
  </div>;
};
Gallery.propTypes = {
  image: PropTypes.string.isRequired
};
export default memo(Gallery);
