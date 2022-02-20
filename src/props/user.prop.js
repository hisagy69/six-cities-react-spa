import PropTypes from 'prop-types';
export default PropTypes.shape({
  email: PropTypes.string,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});
