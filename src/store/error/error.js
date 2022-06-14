import {errorSend} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  errorSend: false
};

const error = createReducer(initialState, (builder) => {
  builder.addCase(errorSend, (state) => {
    state.errorSend = true;
  });
});

export {error};
