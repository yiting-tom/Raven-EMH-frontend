import React from 'react';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
} from 'reactstrap';

import bot1Img from 'assets/img/1.png';
import bot2Img from 'assets/img/2.png';
import bot3Img from 'assets/img/3.png';

const emh_robots = [
  {
    img_path: bot1Img,
    name: 'Dave Hamlet',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
  },
  {
    img_path: bot2Img,
    name: 'Georgie Cooke',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
  },
  {
    img_path: bot3Img,
    name: 'Jamil Barrera',
    personality: 'practical, sincere, talkative, thoughtful and considerate',
  },
];

function RobotProfilePage() {
  return (
    <>
      <div className="content">
        <Row>
          {emh_robots.map(({ img_path, name, personality }) => {
            return (
              <Col md="4" key={name}>
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img alt="..." className="avatar" src={img_path} />
                        <h5 className="title">{name}</h5>
                      </a>
                      <p className="description">EMH Robot</p>
                    </div>
                    <div className="card-description">{personality}</div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <Button className="btn-icon btn-round" color="facebook">
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button className="btn-icon btn-round" color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default RobotProfilePage;
