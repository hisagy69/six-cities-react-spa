import React, {memo} from 'react';
import PropTypes from 'prop-types';
const Tab = (props) => {
  return <li className="locations__item">
    <a onClick={props.onCityEnter.bind(null, props.location)} className={ props.active ?
      `locations__item-link tabs__item tabs__item--active` :
      `locations__item-link tabs__item`}>
      <span>{props.location}</span>
    </a>
  </li>;
};
Tab.propTypes = {
  location: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onCityEnter: PropTypes.func.isRequired
};
export default memo(Tab);
