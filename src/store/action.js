import {createAction} from '@reduxjs/toolkit';

export const ActionTypes = {
  CURRENT_CITY_ENTER: `offers/curent-city-enter`,
  OFFERS_SORT: `offers/sort`,
  SET_ID: `offers/id`,
  OFFERS_LOAD: `offers/load`,
  OFFERS_UPDATE: `offers/update`,
  HOTEL_LOAD_START: `hotel/load-start`,
  HOTEL_LOAD: `hotel/load`,
  HOTEL_UPDATE: `hotel/update`,
  HOTEL_NEARBY_LOAD_START: `hotel/nearby-load-start`,
  HOTEL_NEARBY: `hotel/nearby`,
  HOTEL_NEARBY_UPDATE: `hotel/nearby-update`,
  NOT_FOUND: `hotel/not-found`,
  GET_COMMENTS: `hotel/get-comments`,
  POST_COMMENT_STATUS_SEND: `hotel/post-comment-status-send`,
  ERROR_SEND: `error/send`,
  REQUIRED_AUTHORIZATION: `user/required-authorization`,
  GET_FAVORITES: `user/get-favorites`,
  POST_FAVORITES: `user/post-favorites`,
  USER_LOAD: `user/load-user`
};

export const setCity = createAction(ActionTypes.CURRENT_CITY_ENTER, (city) => ({
  payload: city
}));

export const setSort = createAction(ActionTypes.OFFERS_SORT, (sort) => ({
  payload: sort
}));

export const setId = createAction(ActionTypes.SET_ID, (id) => ({
  payload: id
}));

export const offersLoad = createAction(ActionTypes.OFFERS_LOAD, (offers) => ({
  payload: offers
}));

export const offersUpdate = createAction(ActionTypes.OFFERS_UPDATE, (data) => ({
  payload: data
}));

export const requiredAuthorization = createAction(ActionTypes.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status
}));

export const userLoad = createAction(ActionTypes.USER_LOAD, (user) => ({
  payload: user
}));

export const hotelLoadStart = createAction(ActionTypes.HOTEL_LOAD_START);

export const hotelLoad = createAction(ActionTypes.HOTEL_LOAD, (data) => ({
  payload: data
}));

export const hotelUpdate = createAction(ActionTypes.HOTEL_UPDATE, (data) => ({
  payload: data
}));

export const hotelNearbyLoadStart = createAction(ActionTypes.HOTEL_NEARBY_LOAD_START);

export const hotelNearby = createAction(ActionTypes.HOTEL_NEARBY, (data) => ({
  payload: data,
}));

export const hotelNearbyUpdate = createAction(ActionTypes.HOTEL_NEARBY_UPDATE, (data) => ({
  payload: data
}));

export const hotelNotFound = createAction(ActionTypes.NOT_FOUND);

export const getComments = createAction(ActionTypes.GET_COMMENTS, (data) => ({
  payload: data,
}));

export const postCommentStatusSend = createAction(ActionTypes.POST_COMMENT_STATUS_SEND);

export const errorSend = createAction(ActionTypes.ERROR_SEND);

export const getFavorites = createAction(ActionTypes.GET_FAVORITES, (data) => ({
  payload: data
}));

export const postFavorite = createAction(ActionTypes.POST_FAVORITES);
