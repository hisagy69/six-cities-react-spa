import {combineReducers} from 'redux';
import {error} from './error/error';
import {offers} from './offers/offers';
import {hotel} from './hotel/hotel';
import {user} from './user/user';

export const NameSpace = {
  ERROR: `ERROR`,
  OFFERS: `OFFERS`,
  HOTEL: `HOTEL`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.ERROR]: error,
  [NameSpace.OFFERS]: offers,
  [NameSpace.HOTEL]: hotel,
  [NameSpace.USER]: user,
});
