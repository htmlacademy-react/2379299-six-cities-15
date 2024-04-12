import {useRef, useEffect} from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import useMap from '../map/use-map';
import { City } from '../../types/offer';
import { ExtendedOffer } from '../../types/extended-offer';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type Props = {
  currentCity: City;
  points: (Offer | ExtendedOffer)[] ;
  activeCardId: string | undefined;
  className: string;
}


function Map({currentCity, points, activeCardId, className}: Props) {

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, currentCity);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT ,
    iconSize: [27, 39],
    iconAnchor: [13.5, 39]
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [27, 39],
    iconAnchor: [13.5, 39]
  });

  const markerLayer = useRef<LayerGroup>(new leaflet.LayerGroup());

  useEffect(() => {
    if (map) {
      map.setView([currentCity.location.latitude, currentCity.location.longitude], currentCity.location.zoom);
      markerLayer.current.addTo(map);
      const currentMarkerLayer = markerLayer.current;
      return () => {
        currentMarkerLayer.remove();
      };
    }
  }, [map, currentCity]);

  useEffect(() => {

    markerLayer.current.clearLayers();

    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.id === activeCardId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerLayer.current);
      });
    }
  }, [map, points, activeCardId, currentCustomIcon, defaultCustomIcon]);

  return (
    <section className={`${className}__map map`} ref={mapRef} />
  );
}

export default Map;
