import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatPercentage } from '../utils/numberUtils';
import RenderMap from './RenderMap';

const CasesPerCapita = ({ coloredCountries }: MapProps) => {
  const max = findMax(coloredCountries, (x: Country) => {
    if (Number.isNaN(x.casesPerCapita)) {
      return 0;
    } else {
      return x.casesPerCapita;
    }
  });
  const onEachCountry = (country: ColoredCountry, layer: any) => {
    layer.options.fillColor = country.casesPerCapitaColor;
    layer.bindPopup(`${country.properties.ADMIN} ${formatPercentage(country.casesPerCapita)}`);
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
        Cases Per Capita<div className="gradientPerCapita"></div>
        <div className="legendBar"></div>
        <div className="legendBar2"></div>
        <div className="legendBar3"></div>
        <div className="legendBar4"></div>
        <div className="legendHighest">{formatPercentage(max)} </div>
        <div className="legendMidHigh">{formatPercentage((max / 4) * 2)} </div>
        <div className="legendMidLow">{formatPercentage(max / 4)} </div>
        <div className="legendLowest">{formatPercentage(0)}</div>
      </div>
    </div>
  );
};
export default CasesPerCapita;
