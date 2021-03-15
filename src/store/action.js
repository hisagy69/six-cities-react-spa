export const ActionType = {
  CITY_ENTER: `cards/cityEnter`,
};
export const ActionCreator = {
  cityEnter: (city) => ({
    type: ActionType.CITY_ENTER,
    payload: city
  })
};
