import React from 'react';
import Gallery from './gallery';
import Header from '../header';
import Property from './property';
import NearPlaces from './near-places';
import PropTypes from 'prop-types';

const OfferScreen = (props) => {
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
  cards: PropTypes.array.isRequired
};
export default OfferScreen;
