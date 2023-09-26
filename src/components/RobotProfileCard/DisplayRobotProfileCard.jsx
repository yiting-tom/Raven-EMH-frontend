import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { styled, css } from 'styled-components';

import RobotOptions from './RobotOptions';
import { createJellyAnimation, color } from '../../style';

const ProfileCard = styled(Card)`
  height: 270px;
  max-height: 270px;
  width: 200px;
  max-width: 200px;
  border-radius: 1em;
  margin: 3em 0.65em 2em;
  box-shadow: 0 0 1em 1em rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease-in-out,
    border 0.2s ease-in-out;

  ${(props) =>
    props.$selected
      ? css`
          transform: scale(1.1);
          border: 2px solid ${color.primaryA(0.8)};
        `
      : css`
          &:hover {
            animation: ${createJellyAnimation(1)} 2s ease-in-out;
          }
        `}
`;

export default function DisplayRobotProfileCard({
  imageURL,
  name,
  personality,
  extra,
  options,
  selected,
  onClick,
}) {
  return (
    <ProfileCard onClick={onClick} className="card-user" $selected={selected}>
      <CardBody className="author">
        <div className="block block-one" />
        <div className="block block-two" />
        <div className="block block-three" />
        <div className="block block-four" />
        <img alt="avatar" className="avatar" src={imageURL} />
        <h4 className="title">{name}</h4>
        <h5 className="text-center" style={{ margin: '0', fontWeight: 'bold' }}>
          Personality
        </h5>
        <div className="card-description" style={{ margin: '0 0 0.5em' }}>
          {personality}
        </div>
        <h5
          className="text-center"
          style={{ margin: '1em 0 0', fontWeight: 'bold' }}
        >
          Extra Prompt
        </h5>
        <div className="card-description" style={{ margin: '0 0 0.5em' }}>
          {extra ? extra : 'None'}
        </div>
        <RobotOptions selectedOptions={options} setSelectedOptions={() => {}} />
      </CardBody>
    </ProfileCard>
  );
}
