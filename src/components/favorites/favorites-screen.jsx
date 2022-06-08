import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Favorites from './favorites';
const FavoritesScreen = () => {
  return <div className="page">
    <Header/>
    <Favorites/>
    <Footer/>
  </div>;
};
export default FavoritesScreen;
