import {ActionTypes} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  isLoadFavorites: false,
  isLoadStatus: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload.status,
        user: action.payload.user,
        isLoadStatus: true
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
        isLoadFavorites: false
      };
  }
  return state;
};
export {user};
