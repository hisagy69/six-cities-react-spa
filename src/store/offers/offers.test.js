import {offers} from './offers';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {fetchOffersLoad} from '../../api-actions';
import {ActionTypes} from '../action';

const api = createAPI(() => {});

describe(`Reducers 'offers' should work correctly`, () => {
  it(`Reducer city enter, return current city enter`, () => {
    const state = {
      city: `Paris`
    };
    const setCityAction = {
      type: ActionTypes.CURRENT_CITY_ENTER,
      payload: `Amsterdam`
    };

    expect(offers(state, setCityAction))
      .toEqual({
        city: `Amsterdam`
      });
  });
  it(`Reducer for enter sort, return current sort`, () => {
    const state = {
      sort: `Popular`
    };
    const setSortAction = {
      type: ActionTypes.OFFERS_SORT,
      payload: `Price: low to high`
    };

    expect(offers(state, setSortAction))
      .toEqual({
        sort: `Price: low to high`
      });
  });
  it(`Reducer set active id, return id, state id undefined`, () => {
    const setIdAction = {
      type: ActionTypes.SET_ID,
      payload: 1
    };

    expect(offers({}, setIdAction)).toEqual({id: 1});
  });
  it(`Reducer set active id, change id, return id`, () => {
    const state = {
      id: 1
    };
    const setIdAction = {
      type: ActionTypes.SET_ID,
      payload: 2
    };

    expect(offers(state, setIdAction)).toEqual({id: 2});
  });
  it(`Reducer for offers load, return cards`, () => {
    const state = {
      isDataLoaded: false
    };
    const offersLoadAction = {
      type: ActionTypes.OFFERS_LOAD,
      payload: []
    };

    expect(offers(state, offersLoadAction)).toEqual({
      cards: [],
      isDataLoaded: true
    });
  });
  it(`Reducer for update offers, return offers`, () => {
    const state = {
      cards: [
        {
          id: 1,
          hotelData: 1
        },
        {
          id: 2,
          hotelData: 2
        }
      ]
    };
    const offersUpdateAction = {
      type: ActionTypes.OFFERS_UPDATE,
      payload: {
        id: 1,
        hotelData: 2
      }
    };

    expect(offers(state, offersUpdateAction)).toEqual({
      cards: [
        {
          id: 1,
          hotelData: 2
        },
        {
          id: 2,
          hotelData: 2
        }
      ]
    });
  });
});
describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to '/hotels'`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchOffersLoader = fetchOffersLoad();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return fetchOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.OFFERS_LOAD,
          payload: [{fake: true}]
        });
      });
  });
});
