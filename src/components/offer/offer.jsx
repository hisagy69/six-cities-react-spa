import React from 'react';
import Gallery from './gallery';
import Header from '../header';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';

const Offer = (props) => {
  return <div className="page">
    <Header/>
    <main className="page__main page__main--property">
      <section className="property">
        <Gallery/>
        <Property {...props.offer}/>
        <section className="property__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {props.cards.map((card, i) => {
              if (i < 3) {
                return <NearPlaces {...card} key={card.id}/>;
              }
            })}
          </div>
        </section>
      </div>
    </main>
  </div>;
};
Offer.propTypes = {
  offer: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired
};
export default Offer;
