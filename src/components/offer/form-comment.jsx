import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {addAComment} from '../../api-actions';
import {getSendStatus} from '../../store/error/selectors';
import {getStatusCommentSend} from '../../store/hotel/selectors';
import {commentStatusSend} from '../../store/action';
import PropTypes from 'prop-types';
const FormComment = (props) => {
  const buttonRef = useRef();
  const commentRef = useRef();
  const [inputRate, setRate] = useState(``);
  const [inputComment, setComment] = useState(``);
  const changeHandler = (event) => {
    buttonRef.current.disabled = !inputRate || inputComment.length < 50 || inputComment.length > 300;
    setRate(event.target.value);
  };
  return <form className="reviews__form form" action="#" method="post" onSubmit={(event) => {
    event.preventDefault();
    props.onSendComment(props.id, inputComment, inputRate, props.errorSend, commentRef.current);
  }}>
    {props.errorSend && <div>Ошибка отправки</div>}
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      <input value="5" onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" id="5-stars" type="radio"/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input onChange={changeHandler} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </div>
    <textarea onChange={(event) => {
      buttonRef.current.disabled = !inputRate || inputComment.length < 50 || inputComment.length > 300;
      setComment(event.target.value);
    }} className="reviews__textarea form__textarea" id="review" data-testid="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" ref={commentRef} ></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" ref={buttonRef} disabled={!inputRate || inputComment.length < 50 || inputComment.length > 300 || !props.isCommentSend}>Submit</button>
    </div>
  </form>;
};
FormComment.propTypes = {
  onSendComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  errorSend: PropTypes.bool,
  isCommentSend: PropTypes.bool
};
const mapStateToProps = (state) => ({
  errorSend: getSendStatus(state),
  isCommentSend: getStatusCommentSend(state)
});
const mapDispatchToProps = (dispatch) => ({
  onSendComment(id, comment, rating, sendError, commentRef) {
    dispatch(commentStatusSend());
    dispatch(addAComment(id, comment, rating));
    if (!sendError) {
      commentRef.value = ``;
    }
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(FormComment);
export {FormComment};
