import {
  requiredAuthorization,
  offersLoad,
  offersUpdate,
  hotelLoad,
  hotelUpdate,
  hotelNotFound,
  hotelNearby,
  hotelNearbyUpdate,
  getComments,
  errorSend,
  getFavorites,
  postFavorite,
  userLoad
} from './store/action';
import {AuthorizationStatus} from './const';

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(userLoad(data));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getSate, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => {
      dispatch(requiredAuthorization(AuthorizationStatus.AUTH));
      dispatch(userLoad(data));
    })
    .catch(() => {})
);

export const logout = () => (dispatch, _getSate, api) => (
  api.get(`/logout`)
    .then(() => dispatch(requiredAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const fetchFavoritesLoad = () => (dispatch, _getSate, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(getFavorites(data)))
    .catch(() => {})
);

export const addToFavorites = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
    .then(({data}) => {
      dispatch(hotelUpdate(data));
      dispatch(offersUpdate(data));
      dispatch(hotelNearbyUpdate(data));
      dispatch(postFavorite());
    })
);

export const fetchOffersLoad = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(offersLoad(data)))
    .catch(() => {})
);

export const fetchHotelLoad = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(hotelLoad(data)))
    .catch(() => dispatch(hotelNotFound()))
);

export const fetchNearbyLoad = (id) => (dispatch, _getState, api) => (
  api.get(`hotels/${id}/nearby`)
    .then(({data}) => dispatch(hotelNearby(data)))
    .catch(() => {})
);

export const fetchCommentsLoad = (id) => (dispatch, _getSate, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(getComments(data)))
    .catch(() => {})
);

export const addAComment = (id, comment, rating) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => dispatch(getComments(data)))
    .catch(() => dispatch(errorSend()))
);
