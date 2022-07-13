import {user} from './user';
import {
  ActionTypes
} from '../action';
import {AuthorizationStatus} from '../../const';

describe(`Reducers work correctly`, () => {
  it(`Reducer authorization status Auth`, () => {
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
