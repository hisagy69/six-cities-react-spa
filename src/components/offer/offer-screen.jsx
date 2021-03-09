import React from 'react';
import Gallery from './gallery';
import Header from '../header';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';
import Map from '../map/map';
const OfferScreen = (props) => {
  const offers = props.cards.filter((card) => card.location === `Amsterdam`);
  return <div className="page">
    <Header/>
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              props.offer.gallery.map((image, i) => (
                <Gallery image={image} key={i}/>
              ))
            }
          </div>
        </div>
        <Property {...props.offer} reviews={props.reviews}/>
        <section className="property__map map"><Map offers={offers}/></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {props.cards.slice(0, 3).map((card) => {
              return <NearPlaces {...card} key={card.id}/>;
            })}
          </div>
        </section>
      </div>
    </main>
  </div>;
};
OfferScreen.propTypes = {
  offer: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  reviews: PropTypes.array
};
export default OfferScreen;
