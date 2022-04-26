export const ActionTypes = {
  CURRENT_CITY_ENTER: `offers/curentCityEnter`,
  OFFERS_CREATOR: `offers/curentOffer`,
  OFFERS_SORT: `offers/sort`,
  SET_ID: `offers/id`,
  OFFERS_LOAD: `offers/load`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  SET_USER: `user/setUser`,
  HOTEL_LOAD: `hotel/load`,
  HOTEL_NEARBY: `hotel/nearby`,
  NOT_FOUND: `hotel/not-found`,
  GET_COMMENT: `hotel/get-comment`,
  ERROR_SEND: `error/send`,
  GET_FAVORITES: `user/favorite`,
  POST_FAVORITES: `user/post-favorites`
};
export const ActionCreators = {
  setCity: (city) => ({
    type: ActionTypes.CURRENT_CITY_ENTER,
    payload: city
  }),
  setOffers: (offers) => ({
    type: ActionTypes.OFFERS_CREATOR,
    payload: offers
  }),
  setSort: (sort) => ({
    type: ActionTypes.OFFERS_SORT,
    payload: sort
  }),
  setId: (id) => ({
    type: ActionTypes.SET_ID,
    payload: id
  }),
  offersLoad: (offers) => ({
    type: ActionTypes.OFFERS_LOAD,
    payload: offers,
    isDataLoaded: true
  }),
  requiredAuthorization: (status, user) => ({
    type: ActionTypes.REQUIRED_AUTHORIZATION,
    user,
    isLoadStatus: true,
    payload: status
  }),
  hotelLoad: (data) => ({
    type: ActionTypes.HOTEL_LOAD,
    payload: data
  }),
  hotelNearby: (data) => ({
    type: ActionTypes.HOTEL_NEARBY,
    payload: data,
  }),
  hotelNotFound: () => ({
    type: ActionTypes.NOT_FOUND
  }),
  getComment: (data) => ({
    type: ActionTypes.GET_COMMENT,
    payload: data
  }),
  errorSend: () => ({
    type: ActionTypes.ERROR_SEND
  }),
  getFavorites: (data) => ({
    type: ActionTypes.GET_FAVORITES,
    payload: data
  }),
  postFavorite: (data) => ({
    type: ActionTypes.POST_FAVORITES,
    payload: data
  })
};
