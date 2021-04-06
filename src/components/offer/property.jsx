import React, {useState} from 'react';
// eslint-disable-next-line no-unused-vars
import Review from './review';
import PropTypes from 'prop-types';

const Property = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [inputRate, setRate] = useState(``);
  const [inputComment, setComment] = useState(``);
  const changeHandler = (event) => setRate(event.target.value);
  return <div className="property__container container">
    <div className="property__wrapper">
      {props.isPremium && <div className="property__mark">
        <span>Premium</span>
      </div>}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {props.title}
        </h1>
        <button className="property__bookmark-button button" type="button">
          <svg className="property__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{props.isBookmarks ? `To bookmarks` : `In bookmarks`}</span>
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
        {/* <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2> */}
        <ul className="reviews__list">
          {
            // props.reviews.map((review, i) => <Review review={review} key={i}/>)
          }
        </ul>
        <form className="reviews__form form" action="#" method="post">
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            <input value="5" onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" id="5-stars" type="radio"/>
            <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input onChange={ changeHandler } className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
            <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input onChange={ changeHandler } className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
            <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input onChange={ changeHandler } className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
            <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input onChange={ changeHandler } className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
            <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
          <textarea value={inputComment} onChange={ (event) => setComment(event.target.value) } className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
          </div>
        </form>
      </section>
    </div>
  </div>;
};
Property.propTypes = {
  isPremium: PropTypes.bool,
  isBookmarks: PropTypes.bool,
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
};
export default Property;
