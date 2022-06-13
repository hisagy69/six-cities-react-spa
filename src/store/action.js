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
  GET_COMMENT: `hotel/get-comment`,
  ERROR_SEND: `error/send`,
  REQUIRED_AUTHORIZATION: `user/required-authorization`,
  GET_FAVORITES: `user/get-favorites`,
  POST_FAVORITES: `user/post-favorites`,
};

export const setCity = (city) => ({
  type: ActionTypes.CURRENT_CITY_ENTER,
  payload: city
});

export const setSort = (sort) => ({
  type: ActionTypes.OFFERS_SORT,
  payload: sort
});

export const setId = (id) => ({
  type: ActionTypes.SET_ID,
  payload: id
});

export const offersLoad = (offers) => ({
  type: ActionTypes.OFFERS_LOAD,
  payload: offers,
  isDataLoaded: true
});

export const offersUpdate = (data) => ({
  type: ActionTypes.OFFERS_UPDATE,
  payload: data
});

export const requiredAuthorization = (status, user) => ({
  type: ActionTypes.REQUIRED_AUTHORIZATION,
  user,
  isLoadStatus: true,
  payload: status
});

export const hotelLoadStart = () => ({
  type: ActionTypes.HOTEL_LOAD_START
});

export const hotelLoad = (data) => ({
  type: ActionTypes.HOTEL_LOAD,
  payload: data
});

export const hotelUpdate = (data) => ({
  type: ActionTypes.HOTEL_UPDATE,
  payload: data
});

export const hotelNearbyLoadStart = () => ({
  type: ActionTypes.HOTEL_NEARBY_LOAD_START
});

export const hotelNearby = (data) => ({
  type: ActionTypes.HOTEL_NEARBY,
  payload: data,
});

export const hotelNearbyUpdate = (data) => ({
  type: ActionTypes.HOTEL_NEARBY_UPDATE,
  payload: data
});

export const hotelNotFound = () => ({
  type: ActionTypes.NOT_FOUND
});

export const getComment = (data) => ({
  type: ActionTypes.GET_COMMENT,
  payload: data
});

export const errorSend = () => ({
  type: ActionTypes.ERROR_SEND
});

export const getFavorites = (data) => ({
  type: ActionTypes.GET_FAVORITES,
  payload: data
});

export const postFavorite = () => ({
  type: ActionTypes.POST_FAVORITES,
});
