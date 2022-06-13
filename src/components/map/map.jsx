import React, {useEffect, useRef, memo} from 'react';
import {connect} from 'react-redux';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import map from '../../const';
import PropTypes from 'prop-types';
import hotelProp from '../../props/hotel.prop';
const {city, icon, acitveIcon} = map;
const Map = ({offers, activeId}) => {
  const mapRef = useRef();
  const markersRef = useRef();
  useEffect(() => {
    if (!offers) {
      return;
    }
    const locationMaxMin = offers.reduce((obj, {location}) => {
      obj.maxLat = Math.max(location.latitude, obj.maxLat);
      obj.minLat = Math.min(location.latitude, obj.minLat);
      obj.maxLng = Math.max(location.longitude, obj.maxLng);
      obj.minLng = Math.min(location.longitude, obj.minLng);
      return obj;
    }, {});
    const centerLocation = {
      latitude: (locationMaxMin.maxLat - locationMaxMin.minLat) / 2 + locationMaxMin.minLat,
      longitude: (locationMaxMin.maxLng - locationMaxMin.minLng) / 2 + locationMaxMin.minLng,
    };
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: centerLocation.latitude || city.lat,
        lng: centerLocation.longitude || city.lng
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
    mapRef.current.panTo([offers[0].location.latitude, offers[0].location.longitude]);
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker && marker.remove());
    }
    markersRef.current = offers.reduce((markers, marker) => {
      if (marker.location) {
        markers.push(leaflet
        .marker({
          lat: marker.location.latitude,
          lng: marker.location.longitude
        }, {
          icon: activeId === marker.id && leaflet.icon(acitveIcon) || leaflet.icon(icon)
        })
        .addTo(mapRef.current));
      }
      return markers;
    }, []);
  }, [offers, activeId]);
  return <div id="map" ref={mapRef} style={{height: `100%`, maxWidth: `1147px`, margin: `0 auto`}}></div>;
};
const mapStateToProps = ({OFFERS}) => ({
  activeId: OFFERS.id
});
Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(hotelProp)),
  activeId: PropTypes.number
};
const areEqual = (prevProps, nextProps) => {
  return prevProps.activeId === nextProps.activeId && prevProps.offers[0].city.name === nextProps.offers[0].city.name;
};
export default connect(mapStateToProps)(memo(Map, areEqual));
export {Map};
