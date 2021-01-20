// @ts-nocheck
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import { countryStyle, mapUrl } from '../utils/otherUtils';

const RenderMap = ({ coloredCountries, onEachCountry }) => {
  return (
    <MapContainer style={{ height: '93.95vh' }} zoom={4} minZoom={3} center={[53.5, 27]}>
      <GeoJSON style={countryStyle} data={coloredCountries} onEachFeature={onEachCountry} />
      <TileLayer
        url={mapUrl}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
    </MapContainer>
  );
};
export default RenderMap;
