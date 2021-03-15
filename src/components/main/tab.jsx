import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
const Tab = (props) => {
  return <li className="locations__item">
    <Link onClick={props.onCityEnter.bind(null, props.location)} className={ props.active ?
      `locations__item-link tabs__item tabs__item--active` :
      `locations__item-link tabs__item`} to={props.location}>
      <span>{props.location}</span>
    </Link>
  </li>;
};
Tab.propTypes = {
  location: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onCityEnter: PropTypes.func.isRequired
};
export default Tab;
