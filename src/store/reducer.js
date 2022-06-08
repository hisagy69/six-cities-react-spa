import {ActionTypes} from './action';
import {AuthorizationStatus} from '../const';
const initialState = {
  city: `Paris`,
  offers: [],
  sort: `Popular`,
  isDataLoaded: false,
  isHotelLoad: false,
  isHotelNearbyLoad: false,
  isLoadFavorites: false,
  isLoadStatus: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_CITY_ENTER:
      return {
        ...state,
        city: action.payload
      };
    case ActionTypes.OFFERS_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case ActionTypes.SET_ID:
      return {
        ...state,
        id: action.payload
      };
    case ActionTypes.OFFERS_LOAD:
      return {
        ...state,
        cards: action.payload,
        isDataLoaded: true
      };
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
        user: action.user,
        isLoadStatus: action.isLoadStatus
      };
    case ActionTypes.HOTEL_LOAD_START:
      return {
        ...state,
        isHotelLoad: false
      };
    case ActionTypes.HOTEL_LOAD:
      return {
        ...state,
        hotel: action.payload,
        isHotelLoad: true,
        notFound: false
      };
    case ActionTypes.HOTEL_NEARBY_START:
      return {
        isHotelNearbyLoad: false
      };
    case ActionTypes.HOTEL_NEARBY:
      return {
        ...state,
        hotelNearby: action.payload,
        isHotelNearbyLoad: true
      };
    case ActionTypes.NOT_FOUND:
      return {
        ...state,
        notFound: true
      };
    case ActionTypes.GET_COMMENT:
      return {
        ...state,
        comments: action.payload,
        errorSend: false
      };
    case ActionTypes.ERROR_SEND:
      return {
        ...state,
        errorSend: true
      };
    case ActionTypes.GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
        isLoadFavorites: true
      };
    case ActionTypes.POST_FAVORITES:
      return {
        ...state,
        cards: state.cards && state.cards.map(((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })),
        hotel: state.hotel && state.hotel.id === action.payload.id ?
          action.payload : state.hotel,
        hotelNearby: state.hotelNearby && state.hotelNearby.map(((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })),
        isLoadFavorites: false
      };
  }
  return state;
};
export default reducer;
