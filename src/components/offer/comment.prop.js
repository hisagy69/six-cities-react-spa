import PropTypes from 'prop-types';
import userProp from '../../props/user.prop';
export default PropTypes.shape({
  comment: PropTypes.string.isRequired,
  user: userProp,
  date: PropTypes.IsRequired,
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
});
