import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { styled, css } from 'styled-components';

// import RobotOptions from './RobotOptions';
import { createJellyAnimation, color } from '../../style';

const ProfileCard = styled(Card)`
  /* height: 360px; */
  max-height: 360px;
  width: 200px;
  max-width: 200px;
  border-radius: 1em;
  margin: 3em 0.65em 2em;
  box-shadow: 0 0 1em 1em rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease-in-out,
    border 0.3s ease-in-out;

  ${(props) =>
    props.$selected
      ? css`
          transform: scale(1.05);
          border: 2px solid ${color.primaryA(0.8)};
        `
      : css`
          transform: scale(0.95);
        `}

  ${(props) =>
    props.$clicked &&
    css`
      animation: ${createJellyAnimation(1.05)} 0.5s ease-in-out;
    `}
`;

export default function DisplayRobotProfileCard({
  imageURL,
  name,
  description,
  selected,
  onClick,
}) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timeout;
    if (clicked) {
      timeout = setTimeout(() => {
        setClicked(false);
      }, 3000); // Reset after the animation duration (3s in this example)
    }
    return () => clearTimeout(timeout);
  }, [clicked]);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  return (
    <ProfileCard
      onClick={handleClick}
      className="card-user"
      $selected={selected}
      $clicked={clicked}
    >
      <CardBody className="author">
        <div className="block block-one" />
        <div className="block block-two" />
        <div className="block block-three" />
        <div className="block block-four" />
        <img alt="avatar" className="avatar" src={imageURL} />
        <h4 className="title">{name}</h4>
        <div
          className="card-description"
          style={{ margin: '0 0 0.5em', fontSize: '0.8em' }}
        >
          {description}
        </div>
        {/* <h5
          className="text-center"
          style={{ margin: '1em 0 0', fontWeight: 'bold' }}
        >
          Extra Prompt
        </h5>
        <div className="card-description" style={{ margin: '0 0 0.5em' }}>
          {extra ? extra : 'None'}
        </div>
        <RobotOptions selectedOptions={options} setSelectedOptions={() => {}} /> */}
      </CardBody>
    </ProfileCard>
  );
}
