import {error} from './error';
import {ActionTypes} from '../action';

describe(`Reducers work correctly`, () => {
  it(`Reducer error send`, () => {
    const state = {
      errorSend: false
    };
    const errorSendAction = {
      type: ActionTypes.ERROR_SEND,
    };

    expect(error(state, errorSendAction))
      .toEqual({
        errorSend: true
      });
  });
});
