import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from '../enum';
import {connect} from 'react-redux';
import {favoritePost} from '../../api-actions';
import {AuthorizationStatus} from '../../const';
const {OFFER} = Routes;
const NearPlaces = (props) => {
  return <Fragment>
    <article className="near-places__card place-card" onMouseOver={() => props.onIdMarker(props.id)}>
      <div className="near-places__image-wrapper place-card__image-wrapper">
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
          <button className={`place-card__bookmark-button ${props.isFavorite && `place-card__bookmark-button--active`} button`} type="button" onClick={() => props.authorizationStatus === AuthorizationStatus.AUTH ? props.onFavorite(props.id, props.isFavorite) : props.onButtonClick()}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            { props.isFavorite ? <span className="visually-hidden">In bookmarks</span> :
              <span className="visually-hidden">To bookmarks</span> }
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
    </article>
  </Fragment>;
};
NearPlaces.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  isFavorite: PropTypes.bool,
  price: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  onIdMarker: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});
const mapDispatchToProps = (dispatch) => ({
  onFavorite(id, isFavorite) {
    const status = isFavorite ? 0 : 1;
    dispatch(favoritePost(id, status));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(NearPlaces);
export {NearPlaces};
