import {ActionTypes} from './action';
const initialState = {
  city: `Paris`,
  offers: [],
  sort: `Popular`
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURENT_CITY_ENTER:
      return {
        ...state,
        city: action.payload
      };
    case ActionTypes.OFFERS_CREATOR:
      return {
        ...state,
        offers: action.payload
      };
    case ActionTypes.OFFERS_SORT:
      return {
        ...state,
        sort: action.payload
      };
  }
  return state;
};
export default reducer;
