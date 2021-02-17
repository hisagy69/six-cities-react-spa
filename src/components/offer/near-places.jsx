import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
const NearPlaces = (props) => {
  return <Fragment>
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${props.id}`}>
          <img className="place-card__image" src={props.image} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            { props.isBookmarks ? <span className="visually-hidden">In bookmarks</span> :
              <span className="visually-hidden">To bookmarks</span> }
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `80%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${props.id}`}>{props.name}</Link>
        </h2>
        <p className="place-card__type">{props.types}</p>
      </div>
    </article>
  </Fragment>;
};
NearPlaces.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  types: PropTypes.string.isRequired,
  isBookmarks: PropTypes.bool,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};
export default NearPlaces;
