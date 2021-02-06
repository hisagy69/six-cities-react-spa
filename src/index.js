import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const cards = [
  {
    premium: `Premium`,
    image: `img/apartment-01.jpg`,
    cardName: `Beautiful &amp; luxurious apartment at great location`,
    cardTypes: `Apartment`,
    price: `&euro;120`,
    priceText: `&#47;&nbsp;night`,
    bookmarks: `To bookmarks`,
    width: {width: `80%`}
  },
  {
    image: `img/room.jpg`,
    cardName: `Wood and stone place`,
    cardTypes: `Private room`,
    price: `&euro;80`,
    priceText: `&#47;&nbsp;night`,
    bookmarks: `In bookmarks`,
    width: {width: `80%`}
  },
  {
    image: `img/apartment-02.jpg`,
    cardName: `Canal View Prinsengracht`,
    cardTypes: `Apartment`,
    price: `&euro;132`,
    priceText: `&#47;&nbsp;night`,
    bookmarks: `To bookmarks`,
    width: {width: `80%`}
  },
  {
    premium: `Premium`,
    image: `img/apartment-03.jpg`,
    cardName: `Nice, cozy, warm big bed apartment`,
    cardTypes: `Apartment`,
    price: `&euro;180`,
    priceText: `&#47;&nbsp;night`,
    bookmarks: `To bookmarks`,
    width: {width: `100%`}
  },
  {
    image: `img/room.jpg`,
    cardName: `Wood and stone place`,
    cardTypes: `Private room`,
    price: `&euro;80`,
    priceText: `&#47;&nbsp;night`,
    bookmarks: `In bookmarks`,
    width: {width: `80%`}
  }
];
const locations = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
ReactDOM.render(<App cards={cards} locations={locations}/>, document.getElementById(`root`));
