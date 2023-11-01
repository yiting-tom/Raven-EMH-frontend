import React from 'react';
import { Card, CardBody, Col, Modal, Label } from 'reactstrap';
import { styled } from 'styled-components';

import RobotOptions from '../RobotProfileCard/RobotOptions';

const RobotProfileModalContainer = styled(Modal)`
  border-radius: 1em;
  max-width: 100vw;
  max-width: 1024px;
  width: 100vw;
  box-shadow: none;
  .modal-content {
    @media (min-width: 992px) {
      left: 16.5%;
    }
    background-color: transparent;
    border-radius: 1em;
  }
`;

const ProfileCard = styled(Card)`
  border-radius: 1em;
  min-height: 48vh;
  height: 100%;
`;

const TextareaLabel = styled.h5`
  font-weight: bold;
  margin: 0.2em auto;
  margin-top: 1em;
  position: relative;
`;

export default function RobotProfileModal({
  robotProfile,
  isOpen,
  toggle,
  workflow,
}) {
  return (
    <RobotProfileModalContainer isOpen={isOpen} toggle={toggle}>
      <Col md="12" lg="12" style={{ margin: '1em 0' }}>
        <ProfileCard className="card-user">
          <CardBody className="author">
            <h4 className="title">
              {robotProfile.name}-{robotProfile.model}
            </h4>

            <TextareaLabel>Prompt</TextareaLabel>
            <div
              className="card-description"
              style={{ margin: '0 0 0.5em', textAlign: 'left' }}
            >
              {robotProfile.prompt}
            </div>

            <TextareaLabel>Filter</TextareaLabel>
            {robotProfile.filters.length > 0 &&
              robotProfile.filters.map((filter, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid black',
                    borderRadius: '1em',
                    padding: '1em',
                  }}
                >
                  <Label>
                    No. {idx + 1} {filter.name}
                  </Label>
                  <hr />
                  <Label>Prompt</Label>
                  <p style={{ textAlign: 'left' }}>{filter.prompt}</p>
                  <hr />
                  <Label for="isRegex">
                    Is Regular Expression: {filter.isRegex.toString()}
                  </Label>
                </div>
              ))}

            <TextareaLabel>Robot Options</TextareaLabel>
            <RobotOptions
              selectedOptions={robotProfile.options}
              setSelectedOptions={() => {}}
            />
            <hr />
            <TextareaLabel>Workflow</TextareaLabel>
            <div
              style={{
                textAlign: 'left',
                border: '1px solid black',
                borderRadius: '1em',
                padding: '1em',
              }}
            >
              {workflow &&
                workflow.length > 0 &&
                workflow.map((flow, idx) => (
                  <>
                    {idx === 0 ? (
                      <p key={idx}>
                        <span>
                          Dialog: <br />
                        </span>
                        {/* split with text Dialog: and \n */}
                        {flow
                          .split('Dialog: ')[1]
                          .split('\n')
                          .map((line, idx) => (
                            <span key={idx}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </p>
                    ) : (
                      <>
                        <hr />
                        <p key={idx}>{flow}</p>
                      </>
                    )}
                  </>
                ))}
            </div>
          </CardBody>
        </ProfileCard>
      </Col>
    </RobotProfileModalContainer>
  );
}
