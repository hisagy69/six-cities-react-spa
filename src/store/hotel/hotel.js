import {hotelLoadStart, hotelLoad, hotelUpdate, hotelNearbyLoadStart, hotelNearby, hotelNearbyUpdate, hotelNotFound, getComments, postCommentStatusSend} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isHotelLoad: false,
  isHotelNearbyLoad: false,
  isCommentSend: false
};

const hotel = createReducer(initialState, (builder) => {
  builder.addCase(hotelLoadStart, (state) => {
    state.isHotelLoad = false;
  });
  builder.addCase(hotelLoad, (state, action) => {
    state.hotel = action.payload;
    state.isHotelLoad = true;
    state.notFound = false;
  });
  builder.addCase(hotelUpdate, (state, action) => {
    state.hotel = state.hotel && action.payload.id === state.hotel.id ?
      action.payload :
      state.hotel;
  });
  builder.addCase(hotelNearbyLoadStart, (state) => {
    state.isHotelNearbyLoad = false;
  });
  builder.addCase(hotelNearby, (state, action) => {
    state.hotelNearby = action.payload;
    state.isHotelNearbyLoad = true;
  });
  builder.addCase(hotelNearbyUpdate, (state, action) => {
    state.hotelNearby = state.hotelNearby && state.hotelNearby.map(((item) => {
      if (item.id === action.payload.id) {
        return action.payload;
      }
      return item;
    }));
  });
  builder.addCase(hotelNotFound, (state) => {
    state.notFound = true;
  });
  builder.addCase(getComments, (state, action) => {
    state.comments = action.payload;
    state.errorSend = false;
    state.isCommentSend = true;
  });
  builder.addCase(postCommentStatusSend, (state) => {
    state.isCommentSend = false;
  });
});

export {hotel};
