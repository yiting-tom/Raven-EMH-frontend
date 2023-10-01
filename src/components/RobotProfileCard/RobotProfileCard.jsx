import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { Card, CardBody, Col } from 'reactstrap';
import { styled } from 'styled-components';

import RobotOptions from './RobotOptions';
import RobotProfileCreationCard from './RobotProfileCreationCard';
import { AuthContext } from '../../contexts/AuthContext';

const ProfileCard = styled(Card)`
  border-radius: 1em;
  min-height: 48vh;
  height: 100%;
  margin: 0;
`;

export default function RobotProfileCard({
  imageURL,
  name,
  prompt,
  description,
  options,
  filters,
  refetchRobotsProfiles,
}) {
  const [toggle, setToggle] = useState(false);
  const { userRole } = React.useContext(AuthContext);

  return (
    <Col md="6" lg="4" style={{ margin: '1em 0' }}>
      <ProfileCard className="card-user">
        <CardBody className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <img alt="avatar" className="avatar" src={imageURL} />
          <h4 className="title">
            {name}
            {userRole === 'ADMIN' && (
              <BiEdit
                type="button"
                size="0.8em"
                style={{ marginTop: '0.5em' }}
                onClick={() => setToggle(true)}
              />
            )}
          </h4>
          <h5
            className="text-center"
            style={{ margin: '0', fontWeight: 'bold' }}
          >
            Prompt
          </h5>
          <div className="card-description" style={{ margin: '0 0 0.5em' }}>
            {prompt}
          </div>
          <RobotOptions
            selectedOptions={options}
            setSelectedOptions={() => {}}
          />
        </CardBody>
      </ProfileCard>
      <RobotProfileCreationCard
        refetchRobotsProfiles={refetchRobotsProfiles}
        toggle={toggle}
        setToggle={setToggle}
        defaultName={name}
        defaultOptions={options ? options : []}
        defaultPrompt={prompt}
        defaultDescription={description}
        defaultStatus={'UPDATE'}
        defaultImageURL={imageURL ? imageURL : null}
        defaultFilters={filters ? filters : []}
      />
    </Col>
  );
}
