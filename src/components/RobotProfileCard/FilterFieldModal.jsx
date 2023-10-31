import React, { useState } from 'react';
import {
  Button,
  Card,
  CardTitle,
  Col,
  CustomInput,
  Input,
  Label,
  Modal,
  Row,
} from 'reactstrap';
import { styled } from 'styled-components';

const CreaterModal = styled(Modal)`
  margin: auto;
  margin-top: -8em;
  box-shadow: 0px 0px 100vw rgba(0, 0, 0, 1);
  background-color: transparent;
  border-radius: 1em;
  top: 5%;
  .modal-content {
    background-color: transparent;
  }
`;

const CreaterCard = styled(Card)`
  border-radius: 1em;
  padding: 1em;
  height: 100%;
  margin-bottom: 0;
`;

const CustomButton = styled(Button)`
  padding: 9px;
  border-radius: 0.5em;
  width: 100%;
`;

export default function FilterFieldModal({
  isToggle,
  status,
  handleIsToggle,
  defaultFilterName,
  defaultFilterPrompt,
  defaultIsRegex,
  handleAddFilter,
  handleDeleteFilter,
  handleUpdateFilter,
}) {
  const [filterName, setFilterName] = useState(defaultFilterName || '');
  const [filterPrompt, setFilterPrompt] = useState(defaultFilterPrompt || '');
  const [isRegex, setIsRegex] = useState(defaultIsRegex || false);

  const resetAllStatus = () => {
    setFilterName(defaultFilterName);
    setFilterPrompt(defaultFilterPrompt);
    setIsRegex(defaultIsRegex);
    handleIsToggle();
  };

  const handleDelete = () => {
    const targetFilter = {
      name: filterName,
      prompt: filterPrompt,
      isRegex,
    };
    handleDeleteFilter(targetFilter);
    resetAllStatus();
  };

  const handleAdd = () => {
    const targetFilter = {
      name: filterName,
      prompt: filterPrompt,
      isRegex,
    };
    handleAddFilter(targetFilter);
    resetAllStatus();
  };

  const handleUpdate = () => {
    const targetFilter = {
      name: filterName,
      prompt: filterPrompt,
      isRegex,
    };
    handleUpdateFilter(targetFilter);
    resetAllStatus();
  };

  return (
    <CreaterModal isOpen={isToggle} toggle={handleIsToggle}>
      <CreaterCard>
        <CardTitle style={{ fontSize: '2em', textAlign: 'center' }}>
          Filter Editor
        </CardTitle>

        <Label
          for="filterName"
          onChange={(event) => setFilterName(event.target.value)}
        >
          Filter Name
        </Label>
        <Input
          disabled={status === 'UPDATE'}
          type="text"
          id="filterName"
          placeholder="filter name"
          onChange={(event) => setFilterName(event.target.value)}
          value={filterName}
        />

        <br />

        <Label for="filterPrompt">
          Filter Prompt{' '}
          <a
            href="https://hackmd.io/@7Y70YnnOSr249wjiLZCyPQ/H1yZraMWT"
            target="_blank"
            rel="noreferrer"
          >
            (Introduction to the Filter Editor)
          </a>
        </Label>
        <Input
          type="textarea"
          id="filterPrompt"
          placeholder="filter prompt"
          onChange={(event) => setFilterPrompt(event.target.value)}
          value={filterPrompt}
          style={{
            height: '20vh',
            maxHeight: '20vh',
          }}
        />

        <br />

        <Label for="isRegex">
          Is Regular Expression(don't support variables access, it will be
          applied to the whole input text)
        </Label>
        <CustomInput
          type="switch"
          id="isRegex"
          checked={isRegex}
          onChange={() => setIsRegex(!isRegex)}
        />

        <hr />

        {status === 'UPDATE' ? (
          <Row>
            <Col>
              <CustomButton color="warning" onClick={handleDelete}>
                DELETE
              </CustomButton>
            </Col>
            <Col>
              <CustomButton color="primary" onClick={handleUpdate}>
                UPDATE
              </CustomButton>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <CustomButton color="primary" onClick={handleAdd}>
                CREATE
              </CustomButton>
            </Col>
          </Row>
        )}
      </CreaterCard>
    </CreaterModal>
  );
}
