import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, findMin, formatNumbers } from '../utils/numberUtils';
import RenderMap from './RenderMap';

const ConfirmedCases = ({ coloredCountries }: MapProps) => {
  const max = findMax(coloredCountries, (x: Country) => {
    // Detta ska ändras, importera maxConfirmed el. likande istället direkt i html
    if (Number.isNaN(x.confirmed)) {
      return 0;
    } else {
      return x.confirmed;
    }
  });

  const min = findMin(coloredCountries, (x: Country) => {
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
        <div className="legendHighest"> - {formatNumbers(max)} </div>
        <div className="legendMidHigh"> - {formatNumbers(Math.floor((max / 4) * 2))}</div>
        <div className="legendMidLow"> - {formatNumbers(Math.floor(max / 4))}</div>
        <div className="legendLowest"> - 0</div>
      </div>
      <div className="gradientConfirmed"></div>
    </div>
  );
};
export default ConfirmedCases;
