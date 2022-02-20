import PropTypes from 'prop-types';
import locationProp from './location.prop';
import userProp from './user.prop';
export default {
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: locationProp
  }),
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string.isRequired),
  host: userProp,
  id: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  location: locationProp,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
