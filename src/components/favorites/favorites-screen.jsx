import React, {useEffect} from 'react';
import Header from '../header';
import Footer from '../footer';
import FavoriteCard from './favorite-card';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../spinner';
import {favorites} from '../../api-actions';
const FavoritesScreen = (props) => {
  useEffect(() => {
    if (!props.isLoadFavorites) {
      props.onLoadData();
    }
  }, [props.isLoadFavorites]);
  if (!props.isLoadFavorites) {
    return <Spinner/>;
  }
  const favoritesCity = props.favorites && props.favorites.reduce((obj, card) => {
    obj[card.city.name] = obj[card.city.name] && [...obj[card.city.name], card] || [card];
    return obj;
  }, {});
  return <div className="page">
    <Header/>
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {
          !props.favorites || !props.favorites[0] ?
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  Object.keys(favoritesCity).map((city) => {
                    return <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        { favoritesCity[city].map((card) => <FavoriteCard key={card.id} {...card} isFavorite={card.is_favorite} previewImage={card.preview_image}/>) }
                      </div>
                    </li>;
                  })
                }
              </ul>
            </section>
        }
      </div>
    </main>
    <Footer/>
  </div>;
};
FavoritesScreen.propTypes = {
  favorites: PropTypes.array,
  isLoadFavorites: PropTypes.bool,
  onLoadData: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  favorites: state.favorites,
  isLoadFavorites: state.isLoadFavorites
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(favorites());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
export {FavoritesScreen};
