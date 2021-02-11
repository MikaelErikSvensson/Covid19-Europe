import 'leaflet/dist/leaflet.css';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatPercentage } from '../utils/numberUtils';
import RenderMap from './RenderMap';
import { Modal, Button } from 'react-bootstrap';
import { HiInformationCircle } from 'react-icons/hi';
import { useState } from 'react';

const DeathRate = ({ coloredCountries }: MapProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const max = findMax(coloredCountries, (x: Country) => {
    if (Number.isNaN(x.deathRate)) {
      return 0;
    } else {
      return x.deathRate;
    }
  });
  const onEachCountry = (country: ColoredCountry, layer: any) => {
    layer.options.fillColor = country.deathRateColor;
    layer.bindPopup(`${country.properties.ADMIN} ${formatPercentage(country.deathRate)}`);
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
        Death Rate<div className="gradientDeathRate"></div>
        <div className="legendBar"></div>
        <div className="legendBar4"></div>
        <div className="legendHighestPercent">{formatPercentage(max)} </div>
        <div className="legendLowestPercent">{formatPercentage(0)}</div>
        <button className="infoButton" onClick={handleShow}>
          <HiInformationCircle size={18} />
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This map displays the number of people that have died from covid-19 in relation to how many have been
            infected per country.
          </Modal.Body>
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
export default DeathRate;
