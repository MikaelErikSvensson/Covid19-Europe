import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatNumbers } from '../utils/numberUtils';
import RenderMap from './RenderMap';
import { Modal, Button } from 'react-bootstrap';
import { HiInformationCircle } from 'react-icons/hi';
import { useState } from 'react';

const Deaths = ({ coloredCountries }: MapProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        <button className="infoButton" onClick={handleShow}>
          <HiInformationCircle size={18} />
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>This map display the number of people that have died from Covid-19 per country.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default Deaths;
