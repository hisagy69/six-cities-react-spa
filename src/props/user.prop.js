import PropTypes from 'prop-types';
export default PropTypes.shape({
  email: PropTypes.string,
  name: PropTypes.string.isRequired
});
