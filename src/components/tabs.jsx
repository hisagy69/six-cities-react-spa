import React from 'react';
import PropTypes from 'prop-types';
const Tabs = (props) => (
  <li className="locations__item">
    <a className="locations__item-link tabs__item" href="#">
      <span>{props.location}</span>
    </a>
  </li>
);
Tabs.propTypes = {
  location: PropTypes.string.isRequired
};
export default Tabs;