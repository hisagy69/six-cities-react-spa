import {ActionTypes} from '../action';

const initialState = {
  errorSend: false
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SEND:
      return {
        ...state,
        errorSend: true
      };
  }
  return state;
};
export {error};
