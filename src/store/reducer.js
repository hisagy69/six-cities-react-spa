import cards from '../moks/offers';
import {ActionType} from './action';
const enterCards = (city) => cards.filter((card) => card.location === city);
const initialState = {
  city: `Paris`,
  offers: enterCards(`Paris`)
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_ENTER:
      return {
        ...state,
        city: action.payload || state.city,
        offers: enterCards(action.payload) || state.offer
      };
  }
  return state;
};
export default reducer;
