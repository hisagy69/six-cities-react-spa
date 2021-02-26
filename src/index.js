import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
const cards = [
  {
    isPremium: true,
    image: `img/apartment-01.jpg`,
    name: `Beautiful & luxurious apartment at great location`,
    types: `Apartment`,
    price: 120,
    isBookmarks: false,
    id: `185647`
  },
  {
    image: `img/room.jpg`,
    name: `Wood and stone place`,
    types: `Private room`,
    price: 80,
    isBookmarks: true,
    id: `185648`
  },
  {
    image: `img/apartment-02.jpg`,
    name: `Canal View Prinsengracht`,
    types: `Apartment`,
    price: 132,
    isBookmarks: false,
    id: `185649`
  },
  {
    isPremium: true,
    image: `img/apartment-03.jpg`,
    name: `Nice, cozy, warm big bed apartment`,
    types: `Apartment`,
    price: 180,
    isBookmarks: false,
    id: `185650`
  },
  {
    image: `img/room.jpg`,
    name: `Wood and stone place`,
    types: `Private room`,
    price: 80,
    isBookmarks: true,
    id: `185660`
  }
];
const locations = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`];
ReactDOM.render(<App cards={cards} locations={locations}/>, document.getElementById(`root`));
