import React, { useEffect, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { Row, Card, Button, Col } from 'reactstrap';
import { styled } from 'styled-components';

import { getRobotProfiles } from '../api/robotProfile';
import RobotProfileCard from '../components/RobotProfileCard/RobotProfileCard';
import RobotProfileCreationCard from '../components/RobotProfileCard/RobotProfileCreationCard';

const ProfileCard = styled(Card)`
  border-radius: 1em;
  height: 48vh;
  margin: 1em 0;
`;

const AddRobotButton = styled(Button)`
  margin: auto;
  width: 8em;
  height: 8em;
  border-radius: 50%;
  padding: 0;
`;

function RobotProfilePage() {
  const [emhRobots, setEmhRobots] = useState([]);
  const [toggle, setToggle] = useState(false);

  const fetchRobotsProfiles = async () => {
    const emhRobotsInDB = await getRobotProfiles();
    setEmhRobots(emhRobotsInDB);
    console.debug(`fetched ${emhRobotsInDB.length} robots`);
  };

  useEffect(() => {
    fetchRobotsProfiles();
  }, []);

  return (
    <div className="content">
      <Row>
        {emhRobots.length > 0 &&
          emhRobots.map((robot) => (
            <RobotProfileCard
              {...robot}
              key={robot.name}
              refetchRobotsProfiles={fetchRobotsProfiles}
            />
          ))}

        <Col md="6" lg="4">
          <ProfileCard className="card-user">
            <AddRobotButton
              className="btn-primary"
              onClick={() => setToggle(!toggle)}
            >
              <BiUserPlus size="5em" />
            </AddRobotButton>
          </ProfileCard>
          <RobotProfileCreationCard
            refetchRobotsProfiles={fetchRobotsProfiles}
            toggle={toggle}
            setToggle={setToggle}
            defaultExtra={''}
            defaultImageURL={''}
            defaultName={''}
            defaultOptions={[]}
            defaultPersonality={''}
            defaultStatus={'CREATE'}
          />
        </Col>
      </Row>
    </div>
  );
}

export default RobotProfilePage;
