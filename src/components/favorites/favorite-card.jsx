import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Routes from '../enum';
import {connect} from 'react-redux';
import {addToFavorites} from '../../api-actions';
import {getLoadFavoritesStatus} from '../../store/user/selectors';
const {OFFER} = Routes;
const FavoriteCards = (props) => {
  return <article className="favorites__card place-card">
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <Link to={`${OFFER}${props.id}`}>
        <img className="place-card__image" src={props.previewImage} width="150" height="110" alt="Place image"/>
      </Link>
    </div>
    <div className="favorites__card-info place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{props.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button place-card__bookmark-button--active button" onClick={() => props.onFavorite(props.id, props.isFavorite)} type="button">
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
        <a href="#">{props.title}</a>
      </h2>
      <p className="place-card__type">{props.type}</p>
    </div>
  </article>;
};
FavoriteCards.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  isLoadFavorites: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  onFavorite: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isLoadFavorites: getLoadFavoritesStatus(state)
});
const mapDispatchToProps = (dispatch) => ({
  onFavorite(id, isFavorite) {
    const status = isFavorite ? 0 : 1;
    dispatch(addToFavorites(id, status));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCards);
export {FavoriteCards};
