import React from 'react';
import PropsTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Routes from '../enum';
const {OFFER} = Routes;
const Card = (props) => {
  return <article id={props.id} onMouseOver={() => {
    props.setId(props.id);
    props.onIdMarker(props.id);
  }} className="cities__place-card place-card">
    { props.isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    }
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`${OFFER}${props.id}`}>
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
        <Link to={`${OFFER}${props.id}`}>{props.name}</Link>
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
  id: PropsTypes.string.isRequired,
  setId: PropsTypes.func.isRequired,
  onIdMarker: PropsTypes.func
};
export default Card;
