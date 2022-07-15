import {user} from './user';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {checkAuth, login, logout, fetchFavoritesLoad, addToFavorites} from '../../api-actions';
import {ActionTypes} from '../action';
import {AuthorizationStatus} from '../../const';

const api = createAPI(() => {});

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
      .toEqual({
        isLoadFavorites: false,
        isLoadStatus: false,
        authorizationStatus: AuthorizationStatus.NO_AUTH
      });
  });
  it(`Reducer should update authorization status to 'auth'`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isLoadStatus: false
    };
    const requiredAuthorizationAction = {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
        isLoadStatus: true
      });
  });
  it(`Reducer authorization status No auth`, () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      isLoadStatus: true
    };
    const requiredAuthorizationAction = {
      type: ActionTypes.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    };

    expect(user(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        isLoadStatus: true
      });
  });
  it(`Reducer user load, return user information`, () => {
    const userLoadAction = {
      type: ActionTypes.USER_LOAD,
      payload: {}
    };

    expect(user({}, userLoadAction)).toEqual({user: {}});
  });
  it(`Reducer get favorites, return favorites`, () => {
    const state = {
      isLoadFavorites: false
    };
    const getFavoritesAction = {
      type: ActionTypes.GET_FAVORITES,
      payload: []
    };

    expect(user(state, getFavoritesAction)).toEqual({
      isLoadFavorites: true,
      favorites: []
    });
  });
  it(`Reducer post favorites, return load status false`, () => {
    const state = {
      isLoadFavorites: true
    };
    const postFavoriteAction = {
      type: ActionTypes.POST_FAVORITES,
    };

    expect(user(state, postFavoriteAction)).toEqual({
      isLoadFavorites: false
    });
  });
});
describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {fake: true});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionTypes.USER_LOAD,
          payload: {fake: true}
        });
      });
  });
  it(`Should make a correct API post to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(200, {fake: true});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionTypes.USER_LOAD,
          payload: {fake: true}
        });
      });
  });
  it(`Should make a correct API call to /logout`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onGet(`/logout`)
      .reply(200);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.NO_AUTH
        });
      });
  });
  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = fetchFavoritesLoad();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.GET_FAVORITES,
          payload: [{fake: true}]
        });
      });
  });
  it(`Should make a correct API post to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = addToFavorites(1, AuthorizationStatus.AUTH);
    apiMock
      .onPost(`/favorite/1/${AuthorizationStatus.AUTH}`)
      .reply(200, {fake: true});
    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.HOTEL_UPDATE,
          payload: {fake: true}
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionTypes.OFFERS_UPDATE,
          payload: {fake: true}
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionTypes.HOTEL_NEARBY_UPDATE,
          payload: {fake: true}
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionTypes.POST_FAVORITES,
        });
      });
  });
});
