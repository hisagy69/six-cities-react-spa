import {ActionCreators} from './store/action';
import {AuthorizationStatus} from './const';
export const fetchOffersLoad = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreators.offersLoad(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then((data) => dispatch(ActionCreators.requiredAuthorization(AuthorizationStatus.AUTH, data)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getSate, api) => (
  api.post(`/login`, {email, password})
    .then((data) => dispatch(ActionCreators.requiredAuthorization(AuthorizationStatus.AUTH, data)))
);

export const logout = () => (dispatch, _getSate, api) => (
  api.get(`/logout`)
    .then(() => dispatch(ActionCreators.requiredAuthorization(AuthorizationStatus.NO_AUTH)))
);

export const hotel = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(ActionCreators.hotelLoad(data)))
    .catch(() => dispatch(ActionCreators.hotelNotFound()))
);

export const nearby = (id) => (dispatch, _getState, api) => (
  api.get(`hotels/${id}/nearby`)
    .then(({data}) => dispatch(ActionCreators.hotelNearby(data)))
);

export const comments = (id) => (dispatch, _getSate, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(ActionCreators.getComment(data)))
);

export const commentPost = (id, comment, rating) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => dispatch(ActionCreators.getComment(data)))
    .catch(dispatch(ActionCreators.errorSend()))
);

export const favorites = () => (dispatch, _getSate, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(ActionCreators.getFavorites(data)))
);

export const favoritePost = (id, status) => (dispatch, _getState, api) => {
  api.post(`/favorite/${id}/${status}`)
    .then(({data}) => dispatch(ActionCreators.postFavorite(data)));
  api.get(`/favorite`)
    .then(({data}) => dispatch(ActionCreators.getFavorites(data)));
};
