import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
const Map = ({city, cards, icon}) => {
  const mapRef = useRef();
  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: city.lat,
        lng: city.lng
      },
      zoom: city.zoom
    });
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
        .addTo(mapRef.current);
    cards.forEach((card) => {
      if (card.location === `Amsterdam`) {
        leaflet
          .marker({
            lat: card.cords[0],
            lng: card.cords[1]
          }, {
            icon: leaflet.icon(icon)
          })
          .addTo(mapRef.current);
      }
    });
  },
  []);
  return <div id="map" ref={mapRef} style={{height: `100%`}}></div>;
};
Map.propTypes = {
  city: PropTypes.obj.isRequired,
  cards: PropTypes.array.isRequired,
  icon: PropTypes.obj.isRequired,
};
export default Map;
