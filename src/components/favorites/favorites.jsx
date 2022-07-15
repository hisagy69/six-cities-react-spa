import React, {useEffect, useMemo} from "react";
import FavoriteCard from "./favorite-card";
import Spinner from "../spinner";
import PropTypes from "prop-types";
import hotelProp from "../../props/hotel.prop";
import {connect} from "react-redux";
import {fetchFavoritesLoad} from "../../api-actions";
import {getFavorites, getLoadFavoritesStatus} from '../../store/user/selectors';
const Favorites = (props) => {
  useEffect(() => {
    if (!props.isLoadFavorites) {
      props.onLoadData();
    }
  }, [props.isLoadFavorites]);
  const favoritesCity = useMemo(
      () => props.favorites && props.favorites.reduce((obj, card) => {
        obj[card.city.name] = (obj[card.city.name] && [
          ...obj[card.city.name],
          card,
        ]) || [card];
        return obj;
      }, {}), [props.favorites]);
  if (!props.isLoadFavorites) {
    return <Spinner />;
  }
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        {!props.favorites || !props.favorites[0] ? (
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        ) : (
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoritesCity).map((city) => {
                return (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoritesCity[city].map((card) => (
                        <FavoriteCard
                          key={card.id}
                          {...card}
                          isFavorite={card.is_favorite}
                          previewImage={card.preview_image}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};
const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  isLoadFavorites: getLoadFavoritesStatus(state),
});
const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchFavoritesLoad());
  },
});
Favorites.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  isLoadFavorites: PropTypes.bool,
  onLoadData: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
export {Favorites};
