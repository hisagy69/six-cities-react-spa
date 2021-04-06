import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Routes from '../enum';
const {OFFER} = Routes;
const Card = (props) => {
  return <article id={props.id} onMouseOver={() => {
    props.onIdMarker(props.id);
  }} className="cities__place-card place-card">
    { props.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    }
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`${OFFER}${props.id}`}>
        <img className="place-card__image" src={props.previewImage} width="260" height="200" alt="Place image"/>
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{props.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{props.isBookmarks ? `In bookmarks` : `To bookmarks`}</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: props.rating / 5 * 100 + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`${OFFER}${props.id}`}>{props.title}</Link>
      </h2>
      <p className="place-card__type">{props.type}</p>
    </div>
  </article>;
};
Card.propTypes = {
  isPremium: PropTypes.bool,
  isBookmarks: PropTypes.bool,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onIdMarker: PropTypes.func.isRequired,
};
export default Card;
