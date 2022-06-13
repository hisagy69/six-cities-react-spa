import {NameSpace} from '../root-reducer';

export const getSendStatus = (state) => state[NameSpace.ERROR].errorSend;
