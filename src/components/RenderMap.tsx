// @ts-nocheck
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import { countryStyle, mapUrl } from '../utils/otherUtils';

const RenderMap = ({ coloredCountries, onEachCountry }) => {
  return (
    <MapContainer style={{ height: '90vh' }} zoom={3} minZoom={2} center={[53.5, 20]}>
      <GeoJSON style={countryStyle} data={coloredCountries} onEachFeature={onEachCountry} />
      <TileLayer url={mapUrl} />
    </MapContainer>
  );
};
export default RenderMap;
