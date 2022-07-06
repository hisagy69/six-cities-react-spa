import {
  ActionTypes,
  setCity,
  setSort,
  setId,
  offersLoad,
  offersUpdate,
  requiredAuthorization,
  userLoad,
  hotelLoadStart,
  hotelLoad,
  hotelUpdate,
  hotelNearbyLoadStart,
  hotelNearby,
  hotelNearbyUpdate,
  hotelNotFound,
  getComments,
  commentStatusSend,
  errorSend,
  getFavorites,
  postFavorite
} from './action';
import {AuthorizationStatus} from '../const';

describe(`Action creator work correctly`, () => {
  it(`Action creator for enter city return correct action and city in payload`, () => {
    const expectedAction = {
      type: ActionTypes.CURRENT_CITY_ENTER,
      payload: `Paris`
    };

    expect(setCity(`Paris`)).toEqual(expectedAction);
  });
  it(`Action creator for enter sort offers return currect action and sort in payload`, () => {
    const expectedAction = {
      type: ActionTypes.OFFERS_SORT,
      payload: `Popular`
    };

    expect(setSort(`Popular`)).toEqual(expectedAction);
  });
  it(`Action creator for enter active id, return current action and id in payload`, () => {
    const expectedAction = {
      type: ActionTypes.SET_ID,
      payload: 1
    };

    expect(setId(1)).toEqual(expectedAction);
  });
  it(`Action creator for load offers, return currect action and offers in payload`, () => {
    const expectedAction = {
      type: ActionTypes.OFFERS_LOAD,
      payload: [{}]
    };

    expect(offersLoad([{}])).toEqual(expectedAction);
  });
  it(`Action creator for update offers, return currect action and offer in payload`, () => {
    const expectedAction = {
      type: ActionTypes.OFFERS_UPDATE,
      payload: {}
    };

    expect(offersUpdate({})).toEqual(expectedAction);
  });
  it(`Action creator for update authorization status, return currect action, authorization status and user indformation in payload`, () => {
    const expectedAction = {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(requiredAuthorization(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });
  it(`Action creator for load user, return currect action and user indformation in payload`, () => {
    const expectedAction = {
      type: ActionTypes.USER_LOAD,
      payload: {}
    };

    expect(userLoad({})).toEqual(expectedAction);
  });
  it(`Action creator for hotel load start, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_LOAD_START
    };

    expect(hotelLoadStart()).toEqual(expectedAction);
  });
  it(`Action creator for load hotel, return currect action and hotel indformation in payload`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_LOAD,
      payload: {}
    };

    expect(hotelLoad({})).toEqual(expectedAction);
  });
  it(`Action creator for update hotel, return currect action and hotel indformation in payload`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_UPDATE,
      payload: {}
    };

    expect(hotelUpdate({})).toEqual(expectedAction);
  });
  it(`Action creator for update hotel nearby load start, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_NEARBY_LOAD_START,
    };

    expect(hotelNearbyLoadStart()).toEqual(expectedAction);
  });
  it(`Action creator for load hotel nearby, return currect action and hotel nearby information in payload`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_NEARBY,
      payload: [{}]
    };

    expect(hotelNearby([{}])).toEqual(expectedAction);
  });
  it(`Action creator for update hotel nearby, return currect action and hotel nearby information in payload`, () => {
    const expectedAction = {
      type: ActionTypes.HOTEL_NEARBY_UPDATE,
      payload: [{}]
    };

    expect(hotelNearbyUpdate([{}])).toEqual(expectedAction);
  });
  it(`Action creator for hotel not found, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.NOT_FOUND
    };

    expect(hotelNotFound()).toEqual(expectedAction);
  });
  it(`Action creator for get comments, return currect action and comments in payload`, () => {
    const expectedAction = {
      type: ActionTypes.GET_COMMENTS,
      payload: [{}]
    };

    expect(getComments([{}])).toEqual(expectedAction);
  });
  it(`Action creator for comment status send, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.COMMENT_STATUS_SEND,
    };

    expect(commentStatusSend()).toEqual(expectedAction);
  });
  it(`Action creator for error send form, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.ERROR_SEND,
    };

    expect(errorSend()).toEqual(expectedAction);
  });
  it(`Action creator for get favorites, return currect action and favorites in payload`, () => {
    const expectedAction = {
      type: ActionTypes.GET_FAVORITES,
      payload: [{}]
    };

    expect(getFavorites([{}])).toEqual(expectedAction);
  });
  it(`Action creator for post favorites, return currect action`, () => {
    const expectedAction = {
      type: ActionTypes.POST_FAVORITES,
    };

    expect(postFavorite()).toEqual(expectedAction);
  });
});
