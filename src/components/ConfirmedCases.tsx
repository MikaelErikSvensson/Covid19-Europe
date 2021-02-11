import 'leaflet/dist/leaflet.css';
import {ColoredCountry, Country, MapProps} from '../types/main';
import {findMax, formatNumbers} from '../utils/numberUtils';
import RenderMap from './RenderMap';
import {Modal, Button} from 'react-bootstrap';
import {HiInformationCircle} from 'react-icons/hi';
import {useState} from 'react';

const ConfirmedCases = ({coloredCountries}: MapProps) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
			<div className="legend">
				Confirmed Cases<div className="gradientConfirmed"></div>
				<div className="legendBar"></div>
				<div className="legendBar4"></div>
				<div className="legendHighest">{formatNumbers(maxConfirmed)} </div>
				<div className="legendLowest">0</div>
				<button className="infoButton" onClick={handleShow}>
					<HiInformationCircle size={18} />
				</button>
				<Modal show={show} onHide={handleClose} centered>
					<Modal.Header closeButton>
						<Modal.Title>Information</Modal.Title>
					</Modal.Header>
					<Modal.Body>This map displays how many people have been infected by covid-19 per country.</Modal.Body>
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
export default ConfirmedCases;
