import {requiredAuthorization, offersLoad, offersUpdate, hotelLoad, hotelUpdate, hotelNotFound, hotelNearby, hotelNearbyUpdate, getComment, errorSend, getFavorites, postFavorite} from './store/action';
import {AuthorizationStatus} from './const';

export const fetchOffersLoad = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(offersLoad(data)))
    .catch(() => {})
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(requiredAuthorization(AuthorizationStatus.AUTH, data)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getSate, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(requiredAuthorization(AuthorizationStatus.AUTH, data)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getSate, api) => (
  api.get(`/logout`)
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const hotel = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(hotelLoad(data)))
    .catch(() => dispatch(hotelNotFound()))
);

export const nearby = (id) => (dispatch, _getState, api) => (
  api.get(`hotels/${id}/nearby`)
    .then(({data}) => dispatch(hotelNearby(data)))
    .catch(() => {})
);

export const comments = (id) => (dispatch, _getSate, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(getComment(data)))
    .catch(() => {})
);

export const commentPost = (id, comment, rating) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => dispatch(getComment(data)))
    .catch(dispatch(errorSend()))
);

export const favoritesGet = () => (dispatch, _getSate, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(getFavorites(data)))
    .catch(() => {})
);

export const favoritePost = (id, status) => (dispatch, _getState, api) => {
  api.post(`/favorite/${id}/${status}`)
    .then(({data}) => {
      dispatch(hotelUpdate(data));
      dispatch(offersUpdate(data));
      dispatch(hotelNearbyUpdate(data));
      dispatch(postFavorite());
    });
};
