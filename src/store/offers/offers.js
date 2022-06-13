import {ActionTypes} from '../action';

const initialState = {
  city: `Paris`,
  sort: `Popular`,
  isDataLoaded: false,
};

const offers = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_CITY_ENTER:
      return {
        ...state,
        city: action.payload
      };
    case ActionTypes.OFFERS_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case ActionTypes.SET_ID:
      return {
        ...state,
        id: action.payload
      };
    case ActionTypes.OFFERS_LOAD:
      return {
        ...state,
        cards: action.payload,
        isDataLoaded: true
      };
    case ActionTypes.OFFERS_UPDATE:
      return {
        ...state,
        cards: state.cards && state.cards.map(((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        })),
      };
  }
  return state;
};
export {offers};
