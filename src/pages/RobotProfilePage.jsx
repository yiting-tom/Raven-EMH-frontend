import React, { useEffect, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { Row, Card, Button, Col } from 'reactstrap';
import { styled } from 'styled-components';

import bot1Img from 'assets/img/1.png';
import bot2Img from 'assets/img/2.png';
import bot3Img from 'assets/img/3.png';

import { getRobotProfiles } from '../api/robotProfile';
import RobotProfileCard from '../components/RobotProfileCard/RobotProfileCard';
import RobotProfileCreationCard from '../components/RobotProfileCard/RobotProfileCreationCard';

const emh_robots = [
  {
    img_path: bot1Img,
    name: 'Dave Hamlet',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
    options: ['GPT-4', 'VOICE', 'VIDEO'],
  },
  {
    img_path: bot2Img,
    name: 'Georgie Cooke',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
    options: ['GPT-4', 'VOICE', 'HISTORY', 'MEDICAL KNOWLEDGE'],
  },
  {
    img_path: bot3Img,
    name: 'Jamil Barrera',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
    options: ['VOICE', 'VIDEO', 'HISTORY', 'MEDICAL KNOWLEDGE'],
  },
];

const ProfileCard = styled(Card)`
  border-radius: 1em;
  height: 30vh;
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

  useEffect(async () => {
    const emhRobotsInDB = await getRobotProfiles();
    setEmhRobots(emhRobotsInDB);
  }, []);

  return (
    <div className="content">
      <Row>
        {emhRobots.length > 0 &&
          emhRobots.map((robot) => (
            <RobotProfileCard {...robot} key={robot.name} />
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
