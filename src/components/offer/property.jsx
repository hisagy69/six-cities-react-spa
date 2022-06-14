import React, {useEffect, memo, useMemo} from 'react';
import Review from './review';
import FormComment from './form-comment';
import PropTypes from 'prop-types';
import commentProp from './comment.prop';
import locationProp from '../../props/location.prop';
import {comments, favoritePost} from '../../api-actions';
import {getAuthorizationStatus} from '../../store/user/selectors';
import {getComments, getHotel} from '../../store/hotel/selectors';
import {connect} from 'react-redux';
import {AuthorizationStatus} from '../../const';
const Property = (props) => {
  useEffect(() => {
    if (!props.comments) {
      props.onLoadComments(props.id);
    }
  }, [props.id]);
  const commentsArr = useMemo(() => {
    return props.comments && [...props.comments].sort((a, b) => {
      return new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;
    });
  }, [props.comments]);
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
          <span className="visually-hidden">{props.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
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
            commentsArr.map((review, i) => <Review review={review} key={i}/>)
          }
        </ul>
        {props.authorizationStatus === AuthorizationStatus.AUTH && <FormComment id={props.id}/>}
      </section>
    </div>
  </div>;
};
const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  ...getHotel(state),
  comments: getComments(state),
  isPremium: getHotel(state).is_premium,
  isFavorite: getHotel(state).is_favorite,
  maxAdults: getHotel(state).max_adults,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadComments(id) {
    dispatch(comments(id));
  },
  onFavorite(id, isFavorite) {
    const status = isFavorite ? 0 : 1;
    dispatch(favoritePost(id, status));
  },
});
Property.propTypes = {
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  city: PropTypes.shape({
    location: locationProp,
    name: PropTypes.string.isRequired
  }),
  images: PropTypes.arrayOf(PropTypes.string),
  location: locationProp,
  propertyInsideItems: PropTypes.array,
  rating: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(commentProp),
  onLoadComments: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.isFavorite === nextProps.isFavorite && prevProps.comments === nextProps.comments;
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(Property, areEqual));
export {Property};
