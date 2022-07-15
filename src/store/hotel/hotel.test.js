import {hotel} from './hotel';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {fetchHotelLoad, fetchNearbyLoad, fetchCommentsLoad, addAComment} from '../../api-actions';
import {ActionTypes} from '../action';

const api = createAPI(() => {});

describe(`Reducer 'hotel' should work correctly`, () => {
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
describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to '/hotels/id'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelLoader = fetchHotelLoad(1);

    apiMock
      .onGet(`/hotels/1`)
      .reply(200, {fake: true});

    return hotelLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.HOTEL_LOAD,
          payload: {fake: true}
        });
      });
  });
  it(`Should make a correct API call to '/hotels/id/nearby'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyLoader = fetchNearbyLoad(1);

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, {fake: true});

    return nearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.HOTEL_NEARBY,
          payload: {fake: true}
        });
      });
  });
  it(`Should make a correct API call to '/comments/id'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = fetchCommentsLoad(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.GET_COMMENTS,
          payload: [{fake: true}]
        });
      });
  });
  it(`Should make a correct API post to '/comments/id'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentLoader = addAComment(1, `test`, 5);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.GET_COMMENTS,
          payload: [{fake: true}]
        });
      });
  });
});
