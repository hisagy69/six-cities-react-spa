import {hotel} from './hotel';
import {ActionTypes} from '../action';

describe(`Reducers work correctly`, () => {
  it(`Reducer hotel load, return current hotel information`, () => {
    const state = {
      isHotelLoad: false
    };
    const hotelLoadAction = {
      type: ActionTypes.HOTEL_LOAD,
      payload: {
        id: 1
      }
    };

    expect(hotel(state, hotelLoadAction))
      .toEqual({
        hotel: {
          id: 1
        },
        isHotelLoad: true,
        notFound: false
      });
  });
  it(`Reducer for hotel update, return object hotel unchanged`, () => {
    const state = {
      hotel: {
        id: 1
      }
    };
    const hotelUpdateAction = {
      type: ActionTypes.HOTEL_UPDATE,
      payload: {
        id: 2
      }
    };

    expect(hotel(state, hotelUpdateAction))
      .toEqual({
        hotel: {
          id: 1
        }
      });
  });
  it(`Reducer for hotel update, return object modified`, () => {
    const state = {
      hotel: {
        id: 1,
        isFavorite: true
      }
    };
    const hotelUpdateAction = {
      type: ActionTypes.HOTEL_UPDATE,
      payload: {
        id: 1,
        isFavorite: false
      }
    };

    expect(hotel(state, hotelUpdateAction))
      .toEqual({
        hotel: {
          id: 1,
          isFavorite: false
        }
      });
  });
  it(`Reducer for hotel nearby, return hotel nearby`, () => {
    const state = {
      isHotelNearbyLoad: false
    };
    const hotelNearbyAction = {
      type: ActionTypes.HOTEL_NEARBY,
      payload: []
    };

    expect(hotel(state, hotelNearbyAction)).toEqual({
      isHotelNearbyLoad: true,
      hotelNearby: []
    });
  });
  it(`Reducer hotel nearby update`, () => {
    const state = {
      hotelNearby: [
        {
          id: 1,
          isFavorite: false
        },
        {
          id: 2,
          isFavorite: false
        }
      ]
    };
    const hotelNearbyUpdateAction = {
      type: ActionTypes.HOTEL_NEARBY_UPDATE,
      payload: {
        id: 1,
        isFavorite: true
      }
    };

    expect(hotel(state, hotelNearbyUpdateAction)).toEqual({
      hotelNearby: [
        {
          id: 1,
          isFavorite: true
        },
        {
          id: 2,
          isFavorite: false
        }
      ]
    });
  });
  it(`Reducer for hotel not found`, () => {
    const hotelNotFoundAction = {
      type: ActionTypes.NOT_FOUND,
    };

    expect(hotel({}, hotelNotFoundAction)).toEqual({
      notFound: true
    });
  });
  it(`Reducer for get comments, return comments`, () => {
    const getCommentsAction = {
      type: ActionTypes.GET_COMMENTS,
      payload: []
    };

    expect(hotel({}, getCommentsAction)).toEqual({
      comments: [],
      errorSend: false,
      isCommentSend: true
    });
  });
  it(`Reducer for comment status send, return status send`, () => {
    const commentStatusSendAction = {
      type: ActionTypes.COMMENT_STATUS_SEND,
    };

    expect(hotel({}, commentStatusSendAction)).toEqual({
      isCommentSend: false
    });
  });
});
