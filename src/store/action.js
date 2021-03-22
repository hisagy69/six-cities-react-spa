export const ActionTypes = {
  CURRENT_CITY_ENTER: `offers/curentCityEnter`,
  OFFERS_CREATOR: `offers/curentOffer`,
  OFFERS_SORT: `offers/sort`,
  SET_ID: `offers/id`
};
export const ActionCreators = {
  setCity: (city) => ({
    type: ActionTypes.CURRENT_CITY_ENTER,
    payload: city
  }),
  setOffers: (offers) => ({
    type: ActionTypes.OFFERS_CREATOR,
    payload: offers
  }),
  setSort: (sort) => ({
    type: ActionTypes.OFFERS_SORT,
    payload: sort
  }),
  setId: (id) => ({
    type: ActionTypes.SET_ID,
    payload: id
  })
};
