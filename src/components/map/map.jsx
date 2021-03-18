import React, {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import map from '../const';
import PropTypes from 'prop-types';
const {city, icon} = map;
const Map = ({offers}) => {
  const mapRef = useRef();
  const markersRef = useRef();
  useEffect(() => {
    if (!offers) {
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
  },
  []);
  useEffect(() => {
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker && marker.remove());
    }
    markersRef.current = offers.map((item) => {
      if (!item.cords) {
        return;
      }
      return leaflet
      .marker({
        lat: item.cords[0],
        lng: item.cords[1]
      }, {
        icon: leaflet.icon(icon)
      })
      .addTo(mapRef.current);
    });
  }, [offers]);
  return <div id="map" ref={mapRef} style={{height: `100%`, maxWidth: `1147px`, margin: `0 auto`}}></div>;
};
Map.propTypes = {
  offers: PropTypes.array.isRequired
};
export default Map;
