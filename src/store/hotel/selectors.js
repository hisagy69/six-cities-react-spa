import {NameSpace} from '../root-reducer';

export const getHotel = (state) => state[NameSpace.HOTEL].hotel;
export const getStatusHotelLoad = (state) => state[NameSpace.HOTEL].isHotelLoad;
export const getHotelNearby = (state) => state[NameSpace.HOTEL].hotelNearby;
export const getStatusHotelNearbyLoad = (state) => state[NameSpace.HOTEL].isHotelNearbyLoad;
export const getStatusPageLoad = (state) => state[NameSpace.HOTEL].notFound;
export const getComments = (state) => state[NameSpace.HOTEL].comments;
