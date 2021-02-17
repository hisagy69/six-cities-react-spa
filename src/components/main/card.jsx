import React from 'react';
import PropsTypes from 'prop-types';
import {Link} from 'react-router-dom';
const Card = (props) => {
  return <article className="cities__place-card place-card">
    { props.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    }
    <div className="cities__image-wrapper place-card__image-wrapper">
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
        <button className="place-card__bookmark-button button" type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{props.isBookmarks ? `In bookmarks` : `To bookmarks`}</span>
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
      <p className="place-card__type">{props.type}</p>
    </div>
  </article>;
};
Card.propTypes = {
  isPremium: PropsTypes.bool,
  image: PropsTypes.string.isRequired,
  price: PropsTypes.number.isRequired,
  name: PropsTypes.string.isRequired,
  type: PropsTypes.string,
  isBookmarks: PropsTypes.bool.isRequired,
  id: PropsTypes.string.isRequired
};
export default Card;
