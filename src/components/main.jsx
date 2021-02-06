import React from 'react';
import Header from './header';
import Card from './card';
import Tabs from './tabs';
import PropTypes from 'prop-types';

const Main = (props) => {
  return <React.Fragment>
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                props.locations.map((location, i) => <Tabs key={location + i} location={location}/>)
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {props.cards.map(({premium, image, cardName, cardType, price, priceText, bookmarks, width}, i) => <Card key={cardName + i} premium={premium} image={image} cardName={cardName} cardType={cardType} width={width} price={price} priceText={priceText} bookmarks={bookmarks}/>)
                }
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </React.Fragment>;
};
Main.PropsTypes = {
  locations: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired
};
export default Main;
