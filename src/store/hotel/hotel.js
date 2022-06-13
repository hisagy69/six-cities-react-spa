import {ActionTypes} from '../action';

const initialState = {
  isHotelLoad: false,
  isHotelNearbyLoad: false,
};

const hotel = (state = initialState, action) => {
  switch (action.type) {
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
    case ActionTypes.HOTEL_UPDATE:
      return {
        ...state,
        hotel: state.hotel && action.payload.id === state.hotel.id ?
          action.payload :
          state.hotel,
      };
    case ActionTypes.HOTEL_NEARBY_LOAD_START:
      return {
        ...state,
        isHotelNearbyLoad: false
      };
    case ActionTypes.HOTEL_NEARBY:
      return {
        ...state,
        hotelNearby: action.payload,
        isHotelNearbyLoad: true
      };
    case ActionTypes.HOTEL_NEARBY_UPDATE:
      return {
        ...state,
        hotelNearby: state.hotelNearby && state.hotelNearby.map(((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })),
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
        errorSend: false,
      };
  }
  return state;
};
export {hotel};
