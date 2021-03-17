export const ActionTypes = {
  CURENT_CITY_ENTER: `offers/curentCityEnter`,
  OFFERS_CREATOR: `offers/curentOffer`
};
export const ActionCreators = {
  setCity: (city) => ({
    type: ActionTypes.CURENT_CITY_ENTER,
    payload: city
  }),
  setOffers: (offers) => ({
    type: ActionTypes.OFFERS_CREATOR,
    payload: offers
  })
};
