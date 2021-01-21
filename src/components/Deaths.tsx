import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatNumbers } from '../utils/numberUtils';
import RenderMap from './RenderMap';

const Deaths = ({ coloredCountries }: MapProps) => {
  const maxConfirmed = findMax(coloredCountries, (x: Country) => {
    if (Number.isNaN(x.deaths)) {
      return 0;
    } else {
      return x.deaths;
    }
  });
  const onEachCountry = (country: ColoredCountry, layer: any) => {
    layer.options.fillColor = country.deathsColor;
    layer.bindPopup(`${country.properties.ADMIN} ${formatNumbers(country.deaths)}`);
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
      <div className="legend">
        Deaths<div className="gradientDeaths"></div>
        <div className="legendBar"></div>
        <div className="legendBar2"></div>
        <div className="legendBar3"></div>
        <div className="legendBar4"></div>
        <div className="legendHighest">{formatNumbers(maxConfirmed)} </div>
        <div className="legendMidHigh">{formatNumbers(Math.floor((maxConfirmed / 4) * 2))}</div>
        <div className="legendMidLow">{formatNumbers(Math.floor(maxConfirmed / 4))}</div>
        <div className="legendLowest">0</div>
      </div>
    </div>
  );
};
export default Deaths;
