import React, {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import map from '../const';
import PropTypes from 'prop-types';
const {city, icon} = map;
const Map = ({offers}) => {
  const mapRef = useRef();
  useEffect(() => {
    if (offers.length === 0) {
      return;
    }
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: offers[0] && offers[0].cords[0] || city.lat,
        lng: offers[0] && offers[0].cords[1] || city.lng
      },
      zoom: city.zoom
    });
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
        .addTo(mapRef.current);
    offers.forEach((offer) => {
      leaflet
      .marker({
        lat: offer.cords && offer.cords[0],
        lng: offer.cords && offer.cords[1]
      }, {
        icon: leaflet.icon(icon)
      })
      .addTo(mapRef.current);
    });
  },
  []);
  return <div id="map" ref={mapRef} style={{height: `100%`, maxWidth: `1147px`, margin: `0 auto`}}></div>;
};
Map.propTypes = {
  offers: PropTypes.array.isRequired
};
export default Map;
