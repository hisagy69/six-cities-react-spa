import React from 'react';
import Header from '../header';
import Footer from '../footer';
import FavoriteCard from './favorite-card';
import PropTypes from 'prop-types';
const FavoritesScreen = (props) => {
  return <div className="page">
    <Header/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              props.cards.map((card) => {
                return card.isBookmarks && <li className="favorites__locations-items" key={card.id}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{card.location}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <FavoriteCard {...card}/>
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
