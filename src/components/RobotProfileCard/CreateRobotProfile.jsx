import React, { useState } from 'react';
import { BiUserPlus, BiSolidUserVoice, BiHistory } from 'react-icons/bi';
import { BsPersonVideo } from 'react-icons/bs';
import { FaBook, FaBookMedical } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import {
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import { styled } from 'styled-components';

import ImageUploader from './ImageUploader';
import { uploadImage } from '../../utils/storage';

const Option = styled(Button)`
  padding: 6px 8px;
`;

function ImageUploadComponent() {
  const [imageFile, setImageFile] = useState(null); // [1
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [toggle, setToggle] = useState(false);
  const [extra, setExtra] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) return;

    console.log(`imageFile: ${imageFile}`);
    console.log(`name: ${name}`);
    console.log(`personality: ${personality}`);
    console.log(`extra: ${extra}`);
    // const imageURL = await uploadImage(imageFile);
    // console.log(imageURL);
  };

  return (
    <Col md="4">
      {!toggle ? (
        <Button
          className="btn-primary"
          onClick={() => setToggle(!toggle)}
          style={{
            margin: '40% 0',
            width: '8em',
            height: '8em',
            borderRadius: '50%',
            padding: 0,
          }}
        >
          <BiUserPlus style={{ width: '5em', height: '5em' }} size="3em" />
        </Button>
      ) : (
        <Card className="card-user">
          <Form>
            <CardBody>
              <div className="author">
                <div className="block block-one" />
                <div className="block block-two" />
                <div className="block block-three" />
                <div className="block block-four" />
                <ImageUploader
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                />
                <FormGroup>
                  <h5
                    className="text-center"
                    style={{ margin: '0', fontWeight: 'bold' }}
                  >
                    Name
                  </h5>
                  <Input
                    className="title"
                    style={{
                      fontSize: '1.2em',
                      margin: '0em auto',
                      padding: '0.5em',
                      width: '40%',
                      textAlign: 'center',
                    }}
                    value={name}
                    placeholder="New Robot Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <h5
                    className="text-center"
                    style={{ margin: '2em 0em 0em', fontWeight: 'bold' }}
                  >
                    Personality
                  </h5>
                  <Input
                    className="card-description"
                    style={{
                      margin: '1em auto',
                      padding: '0.5em',
                      width: '100%',
                    }}
                    type="textarea"
                    value={personality}
                    placeholder="New Robot Personality"
                    onChange={(e) => setPersonality(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <h5
                    className="text-center"
                    style={{ margin: '2em 0em 0em', fontWeight: 'bold' }}
                  >
                    Extra Prompts
                  </h5>
                  <Input
                    className="card-description"
                    style={{
                      margin: '1em auto',
                      padding: '0.5em',
                      width: '100%',
                    }}
                    type="textarea"
                    value={extra}
                    placeholder="Extra Prompts"
                    onChange={(e) => setPersonality(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <h5
                    className="text-center"
                    style={{ margin: '2em 0em 0em', fontWeight: 'bold' }}
                  >
                    Robot Options
                  </h5>
                  <Row style={{ margin: '4px 0px' }}>
                    <Option>
                      <SiOpenai size="1.2em" />
                      &nbsp;GPT-4
                    </Option>
                    <Option>
                      <BiSolidUserVoice size="1.2em" />
                      &nbsp;VOICE
                    </Option>
                    <Option>
                      <BsPersonVideo size="1.2em" />
                      &nbsp;VIDEO
                    </Option>
                    <Option>
                      <BiHistory size="1.2em" />
                      &nbsp;HISTORY
                    </Option>
                    <Option>
                      <FaBookMedical size="1.2em" />
                      &nbsp;MEDICAL KNOWLEDGE
                    </Option>
                  </Row>
                </FormGroup>
              </div>
              <Button
                color="primary"
                type="submit"
                className="btn-rounded mt-3"
                onClick={handleSubmit}
                style={{ margin: '0 auto', width: '100%' }}
              >
                CREATE
              </Button>
            </CardBody>
          </Form>
        </Card>
      )}
    </Col>
  );
}

export default ImageUploadComponent;
