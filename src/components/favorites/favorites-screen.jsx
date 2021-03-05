import React from 'react';
import Header from '../header';
import Footer from '../footer';
import FavoriteCard from './favorite-card';
import PropTypes from 'prop-types';
const FavoritesScreen = (props) => {
  const byLocation = props.cards.reduce((obj, card) => {
    if (card.isBookmarks && card.location) {
      obj[card.location] = obj[card.location] || [];
      obj[card.location].push(card);
    }
    return obj;
  }, {});

  return <div className="page">
    <Header/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              Object.keys(byLocation).map((city) => {
                return <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    { byLocation[city].map((card) => <FavoriteCard key={card.id} {...card}/>) }
                  </div>
                </li>;
              })
            }
          </ul>
        </section>
      </div>
    </main>
    <Footer/>
  </div>;
};
FavoritesScreen.propTypes = {
  cards: PropTypes.array.isRequired
};
export default FavoritesScreen;
