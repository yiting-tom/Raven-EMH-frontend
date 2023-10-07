import React, { useContext, useEffect, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { Rings } from 'react-loader-spinner';
import { Row, Card, Button, Col } from 'reactstrap';
import { styled } from 'styled-components';

import RobotProfileCard from '../components/RobotProfileCard/RobotProfileCard';
import RobotProfileCreationCard from '../components/RobotProfileCard/RobotProfileCreationCard';
import { AuthContext } from '../contexts/AuthContext';
import { RobotProfilesContext } from '../contexts/RobotProfilesContext';
import { color } from '../style';

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
  const [toggle, setToggle] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { userRole } = React.useContext(AuthContext);
  const { robotProfiles } = useContext(RobotProfilesContext);

  useEffect(() => {
    // if (Object.keys(robotProfiles).length > 0) {
    // }
    setTimeout(() => {
      setIsFetchingData(false);
    }, 1000);
  }, [robotProfiles]);

  return (
    <div className="content">
      {isFetchingData ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh', // Adjust as needed
          }}
        >
          <Rings
            height="30vh"
            width="30vh"
            color={color.primaryA(0.6)}
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
          <h1>Fetching Data...</h1>
        </div>
      ) : (
        <Row>
          {Object.keys(robotProfiles).length > 0 &&
            Object.entries(robotProfiles).map(([profileId, robot]) => (
              <RobotProfileCard
                {...robot}
                profileId={profileId}
                key={profileId}
                refetchRobotsProfiles={() => {}}
              />
            ))}

          {userRole === 'ADMIN' && ( // only admin can add new robot profile
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
                refetchRobotsProfiles={() => {}}
                toggle={toggle}
                setToggle={setToggle}
                defaultPrompt={''}
                defaultDescription={''}
                defaultImageURL={''}
                defaultName={''}
                defaultOptions={[]}
                defaultStatus={'CREATE'}
                defaultFilters={[]}
              />
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}

export default RobotProfilePage;
