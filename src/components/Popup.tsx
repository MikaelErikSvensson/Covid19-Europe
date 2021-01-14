import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Popup() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={true}
        enforceFocus={true}
        autoFocus={true}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This website is intended to give an overview of the COVID-19 situation in Europe. Mouseover a specific country for exact numbers.
        </Modal.Body>
        <Button id="popupButton" variant="success" onClick={handleClose}>
          OK
        </Button>
      </Modal>
    </>
  );
}

export default Popup;
