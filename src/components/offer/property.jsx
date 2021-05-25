import React, {useEffect} from 'react';
import Review from './review';
import FormComment from './form-comment';
import PropTypes from 'prop-types';
import {comments, favoritePost} from '../../api-actions';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../const';
const Property = (props) => {
  useEffect(() => {
    if (!props.comments) {
      props.onLoadComment(props.id);
    }
  }, [props.comments]);
  useEffect(() => {
    props.onLoadComment(props.id);
  }, [props.id]);
  if (!props.comments) {
    return <span>loading...</span>;
  }
  return <div className="property__container container">
    <div className="property__wrapper">
      {props.isPremium && <div className="property__mark">
        <span>Premium</span>
      </div>}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {props.title}
        </h1>
        <button className={`property__bookmark-button button ${props.isFavorite && `property__bookmark-button--active`}`} onClick={() => props.authorizationStatus === AuthorizationStatus.AUTH ? props.onFavorite(props.id, props.isFavorite) : props.onButtonClick()} type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{props.isFavorite ? `To bookmarks` : `In bookmarks`}</span>
        </button>
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: props.rating / 5 * 100 + `%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{props.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {props.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {props.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {props.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{props.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {
            props.goods.map((item, i) => (
              <li className="property__inside-item" key={i}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
            <img className="property__avatar user__avatar" src={props.host.avatar_url} width="74" height="74" alt="Host avatar"/>
          </div>
          <span className="property__user-name">
            {props.host.name}
          </span>
        </div>
        <div className="property__description">
          <p className="property__text">
            {props.description}
          </p>
        </div>
      </div>
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.comments.length}</span></h2>
        <ul className="reviews__list">
          {
            props.comments.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1).map((review, i) => i < 10 && <Review review={review} key={i}/>)
          }
        </ul>
        {props.authorizationStatus === AuthorizationStatus.AUTH && <FormComment id={props.id}/>}
      </section>
    </div>
  </div>;
};
Property.propTypes = {
  isPremium: PropTypes.bool,
  isFavorite: PropTypes.bool,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string,
  reviews: PropTypes.array,
  propertyInsideItems: PropTypes.array,
  rating: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  goods: PropTypes.array.isRequired,
  host: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  comments: PropTypes.array,
  onLoadComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string,
  onFavorite: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  comments: state.comments
});
const mapDispatchToProps = (dispatch) => ({
  onLoadComment(id) {
    dispatch(comments(id));
  },
  onFavorite(id, isFavorite) {
    const status = isFavorite ? 0 : 1;
    dispatch(favoritePost(id, status));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Property);
export {Property};
