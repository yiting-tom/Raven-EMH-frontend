import React from 'react';
import { BiSolidUserVoice } from 'react-icons/bi';
import { BsPersonVideo } from 'react-icons/bs';
import { SiOpenai } from 'react-icons/si';
import {
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Col,
} from 'reactstrap';
import { styled } from 'styled-components';

const Option = styled(Button)`
  padding: 1em 2em;
`;

export default function RobotProfileCard({ img_path, name, personality }) {
  return (
    <Col md="4" key={name}>
      <Card className="card-user">
        <CardBody className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <img alt="avatar" className="avatar" src={img_path} />
          <h4 className="title">{name}</h4>
          <h5
            className="text-center"
            style={{ margin: '0', fontWeight: 'bold' }}
          >
            Personality
          </h5>
          <div className="card-description" style={{ margin: '0 1em' }}>
            {personality}
          </div>
        </CardBody>
        <CardFooter>
          <ButtonGroup style={{ width: '100%' }}>
            <Option>
              <SiOpenai size="1.5em" /> GPT-3.5
            </Option>
            <Option>
              <BiSolidUserVoice size="1.5em" /> VOICE
            </Option>
            <Option>
              <BsPersonVideo size="1.5em" /> VIDEO
            </Option>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Col>
  );
}
