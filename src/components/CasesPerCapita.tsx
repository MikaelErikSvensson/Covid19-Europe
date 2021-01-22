import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { ColoredCountry, Country, MapProps } from '../types/main';
import { findMax, formatPercentage } from '../utils/numberUtils';
import RenderMap from './RenderMap';
import { Modal, Button } from 'react-bootstrap';
import { HiInformationCircle } from 'react-icons/hi';

const CasesPerCapita = ({ coloredCountries }: MapProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        Cases Per Capita
        <div className="gradientPerCapita"></div>
        <div className="legendBar"></div>
        <div className="legendBar2"></div>
        <div className="legendBar3"></div>
        <div className="legendBar4"></div>
        <div className="legendHighest">{formatPercentage(max)} </div>
        <div className="legendMidHigh">{formatPercentage((max / 4) * 2)} </div>
        <div className="legendMidLow">{formatPercentage(max / 4)} </div>
        <div className="legendLowest">{formatPercentage(0)}</div>
        <button className="infoButton" onClick={handleShow}>
          <HiInformationCircle size={18} />
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This map displays covid-19 cases per capita per country. For example if a country has had 0.01% covid-19 cases per capita, that
            means 1 in every 10 000 people have been infected.
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
export default CasesPerCapita;
