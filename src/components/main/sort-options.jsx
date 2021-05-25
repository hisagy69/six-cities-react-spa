import React, {useRef} from 'react';
import {sorting} from '../sorting';
import PropTypes from 'prop-types';
const SortOptions = (props) => {
  const sortTypeRef = useRef();
  const listRef = useRef();
  const listToggle = () => {
    listRef.current.classList.toggle(`places__options--opened`);
  };
  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" ref={sortTypeRef} tabIndex="0" onClick={listToggle}>
      {props.sort}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className="places__options places__options--custom" ref={listRef}>
      {
        sorting.map((sort) => <li className={props.sort === sort && `places__option places__option--active` || `places__option`} key={sort} onClick={() => props.onSort(sort)} tabIndex="0">{sort}</li>)
      }
    </ul>
  </form>;
};
SortOptions.propTypes = {
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired
};
export default SortOptions;
