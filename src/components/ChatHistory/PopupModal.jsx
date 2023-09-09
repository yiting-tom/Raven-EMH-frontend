import { useSpring, animated } from '@react-spring/web';
import React, { useState, useEffect } from 'react';
import { MdOutlineClose, MdOutlineCheck } from 'react-icons/md';
import { CardBody, Button, Col, Row } from 'reactstrap';
import { styled } from 'styled-components';

const ModalButton = styled(Button)`
  margin: 0 auto;
  padding: 0.5em 3em;
`;
const PopupModalContainer = styled(animated.div)`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  padding-top: 30vh;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
`;

const PopupModel = ({ modalIsOpen, setModalIsOpen }) => {
  const [isVisible, setIsVisible] = useState(modalIsOpen);

  const animation = useSpring({
    onRest: () => {
      if (!isVisible) {
        setModalIsOpen(false);
      }
    },
    opacity: isVisible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 300 },
  });

  const closeModal = () => {
    setIsVisible(false); // Begin the fade-out
  };

  // If modalIsOpen prop changes to true, make the modal visible
  useEffect(() => {
    if (modalIsOpen) {
      setIsVisible(true);
    }
  }, [modalIsOpen]);

  return (
    <PopupModalContainer
      $isOpen={isVisible}
      onClick={closeModal}
      style={animation}
    >
      <Col>
        <Row>
          <CardBody>
            <h3 className="text-center" style={{ color: 'white' }}>
              Are you sure you want to delete this chat?
            </h3>
          </CardBody>
        </Row>
        <Row>
          <ModalButton onClick={closeModal}>
            <MdOutlineCheck size="2em" />
          </ModalButton>
          <ModalButton className="btn-danger" onClick={closeModal}>
            <MdOutlineClose size="2em" />
          </ModalButton>
        </Row>
      </Col>
    </PopupModalContainer>
  );
};

export default PopupModel;
