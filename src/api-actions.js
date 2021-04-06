import {ActionCreators} from './store/action';

export const fetchOffersLoad = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreators.offersLoad(data)))
);
