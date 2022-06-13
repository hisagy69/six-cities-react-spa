import React, {memo} from 'react';
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';
import {Link} from 'react-router-dom';
import {favoritePost} from '../../api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getActiveId} from '../../store/offers/selectors';
import {connect} from 'react-redux';
import Routes from '../enum';
import {AuthorizationStatus} from '../../const';
import {setId} from '../../store/action';
const {OFFER} = Routes;
const Card = (props) => {
  return <article id={props.id} onMouseOver={() => {
    if (props.prevId !== props.id) {
      props.onIdMarker(props.id);
    }
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
        <button className={`place-card__bookmark-button button ${props.isFavorite && `place-card__bookmark-button--active`}`} onClick={() => props.authorizationStatus === AuthorizationStatus.AUTH ? props.onFavorite(props.id, props.isFavorite) : props.onButtonClick()} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{props.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
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
const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  prevId: getActiveId(state)
});
const mapDispatchToProps = (dispatch) => ({
  onFavorite(id, isFavorite) {
    const status = isFavorite ? 0 : 1;
    dispatch(favoritePost(id, status));
  },
  onIdMarker(id) {
    dispatch(setId(id));
  }
});
Card.propTypes = {
  ...hotelProp,
  isPremium: PropTypes.bool,
  isFavorite: PropTypes.bool,
  previewImage: PropTypes.string.isRequired,
  onIdMarker: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.isFavorite === nextProps.isFavorite;
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Card, areEqual));
export {Card};
