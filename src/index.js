import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {nanoid} from 'nanoid';
const cards = [
  {
    isPremium: true,
    image: `img/apartment-01.jpg`,
    name: `Beautiful &amp; luxurious apartment at great location`,
    types: `Apartment`,
    price: 120,
    bookmarks: false,
    id: nanoid()
  },
  {
    image: `img/room.jpg`,
    name: `Wood and stone place`,
    types: `Private room`,
    price: 80,
    bookmarks: true,
    id: nanoid()
  },
  {
    image: `img/apartment-02.jpg`,
    name: `Canal View Prinsengracht`,
    types: `Apartment`,
    price: 132,
    bookmarks: false,
    id: nanoid()
  },
  {
    isPremium: true,
    image: `img/apartment-03.jpg`,
    name: `Nice, cozy, warm big bed apartment`,
    types: `Apartment`,
    price: 180,
    bookmarks: false,
    id: nanoid()
  },
  {
    image: `img/room.jpg`,
    name: `Wood and stone place`,
    types: `Private room`,
    price: 80,
    bookmarks: true,
    id: nanoid()
  }
];
const locations = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
ReactDOM.render(<App cards={cards} locations={locations}/>, document.getElementById(`root`));
