import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatNumbers } from '../utils/numberUtils';
import RenderMap from './RenderMap';

const ConfirmedCases = ({ coloredCountries }: MapProps) => {
  const maxConfirmed = findMax(coloredCountries, (x: Country) => {
    if (Number.isNaN(x.confirmed)) {
      return 0;
    } else {
      return x.confirmed;
    }
  });
  const onEachCountry = (country: ColoredCountry, layer: any) => {
    layer.options.fillColor = country.confirmedColor;
    layer.bindPopup(`${country.properties.ADMIN} ${formatNumbers(country.confirmed)}`);
    layer.on('mouseover', function () {
      layer.openPopup();
      layer.setStyle({
        weight: 3,
      });
    });
    layer.on('mouseout', function () {
      layer.closePopup();
      layer.setStyle({
        weight: 1,
      });
    });
  };
  return (
    <div>
      <RenderMap coloredCountries={coloredCountries} onEachCountry={onEachCountry} />
      <div className="legendTitle">Confirmed Cases</div>
      <div className="legend">
        <div className="legendHighest"> - {formatNumbers(maxConfirmed)} </div>
        <div className="legendMidHigh"> - {formatNumbers(Math.floor((maxConfirmed / 4) * 2))}</div>
        <div className="legendMidLow"> - {formatNumbers(Math.floor(maxConfirmed / 4))}</div>
        <div className="legendLowest"> - 0</div>
      </div>
      <div className="gradientConfirmed"></div>
      <div className="mapFooter">
        Confirmed Cases<div className="gradientConfirmedNew"></div>
      </div>
    </div>
  );
};
export default ConfirmedCases;
