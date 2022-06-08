import React from 'react';
import Header from '../header';
import Offer from './offer';
const OfferScreen = (props) => (
  <div className="page">
    <Header/>
    <Offer {...props}/>
  </div>
);
export default OfferScreen;
