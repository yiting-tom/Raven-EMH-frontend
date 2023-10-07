import React, { useState } from 'react';
import { Card, Modal, Button, CardTitle, Label, CustomInput } from 'reactstrap';
import { styled } from 'styled-components';

const FilterFieldModal = styled(Modal)`
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

const FilterFieldCard = styled(Card)`
  border-radius: 1em;
  padding: 1em;
  height: 100%;
  margin-bottom: 0;
`;

const CustomButton = styled(Button)`
  padding: 8px;
  border-radius: 0.5em;
  width: 100%;
`;

export default function FilterField(filter) {
  const [toggleFilterFieldModal, setToggleFilterFieldModal] = useState(false);

  return (
    <CustomButton onClick={setToggleFilterFieldModal(!toggleFilterFieldModal)}>
      <FilterFieldModal
        isOpen={toggleFilterFieldModal}
        toggle={setToggleFilterFieldModal}
      >
        <FilterFieldCard>
          <CardTitle style={{ fontSize: '2em', textAlign: 'center' }}>
            Filter Editor
          </CardTitle>

          <Label for="filterName">{name}</Label>

          <br />

          <Label for="filterPrompt">
            Filter Prompt <a href="#">(please reference this doc)</a>
          </Label>
          <p>{filter.prompt}</p>

          <br />

          <Label for="isRegex">
            Is Regular Expression(don't support variables access, it will be
            applied to the whole input text)
          </Label>
          <CustomInput
            disabled={true}
            type="switch"
            id="isRegex"
            checked={filter.isRegex}
          />
        </FilterFieldCard>
      </FilterFieldModal>
    </CustomButton>
  );
}
