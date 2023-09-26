import React, { useState } from 'react';
import {
  Progress,
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Modal,
  Row,
  Col,
} from 'reactstrap';
import { styled } from 'styled-components';

import ImageUploader from './ImageUploader';
import RobotOptions from './RobotOptions';
import { createRobotProfile, deleteRobotProfile } from '../../api/robotProfile';
import { uploadImage } from '../../utils/storage';

const CreaterModal = styled(Modal)`
  margin: auto;
  margin-top: -8em;
  box-shadow: 0px 0px 100vw rgba(0, 0, 0, 1);
  background-color: transparent;
  .modal-content {
    background-color: transparent;
  }
`;

const ProfileCreaterCard = styled(Card)`
  border-radius: 1em;
  height: 100%;
  margin-bottom: 0;
`;

const NameInput = styled(Input)`
  margin: 0em auto;
  padding: 2px;
  width: 50%;
  text-align: center;
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 1em;
`;

const TextareaLabel = styled.h5`
  font-weight: bold;
  margin: 0.2em auto;
  margin-top: 1em;
  position: relative;
`;

const TextareaInput = styled(Input)`
  margin: 0em auto;
  margin-bottom: 2em;
  padding: 2px;
  width: 100%;
`;

function RobotProfileCreationCard({
  toggle,
  setToggle,
  defaultImageURL,
  defaultName,
  defaultPersonality,
  defaultExtra,
  defaultOptions,
  defaultStatus,
  refetchRobotsProfiles,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(defaultName);
  const [personality, setPersonality] = useState(defaultPersonality);
  const [extra, setExtra] = useState(defaultExtra);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(defaultStatus);
  const resetAllStatus = () => {
    setImageFile(null);
    setName('');
    setPersonality('');
    setExtra('');
    setSelectedOptions([]);
    setUploadProgress(0);
    setUploadStatus(defaultStatus);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errorMessage = '';

    // Check if imageFile is provided
    if (!imageFile && !defaultImageURL) {
      errorMessage += 'Image file is required. ';
    }

    // Validate the name input
    if (name.trim() === '') {
      errorMessage += 'Name is required. ';
    } else if (name.length < 3) {
      errorMessage += 'Name should be at least 3 characters long. ';
    }

    // Validate the personality input
    if (personality.trim() === '') {
      errorMessage += 'Personality is required. ';
    }

    // If there are any validation errors, alert the user
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    let imageURL = defaultImageURL;
    if (defaultStatus === 'CREATE') {
      try {
        setUploadStatus('Uploading image...');
        imageURL = await uploadImage(
          imageFile,
          `emh-${name}`,
          setUploadProgress,
        );
        setUploadProgress(0);
      } catch (error) {
        console.error('Failed to upload image:', error);
        setUploadProgress(0);
        return;
      }
    }

    try {
      setUploadStatus('Uploading profile...');
      const robotProfile = {
        name: name,
        personality: personality,
        extra: extra,
        options: selectedOptions,
        imageURL: imageURL,
      };
      await createRobotProfile(robotProfile);
    } catch (error) {
      console.error('Failed to upload profile:', error);
    } finally {
      setToggle(false);
    }
    // reset all the states
    resetAllStatus();
    refetchRobotsProfiles();
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      setUploadStatus('Deleting profile...');
      await deleteRobotProfile(defaultName);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    } finally {
      setToggle(false);
    }
    // reset all the states
    resetAllStatus();
    refetchRobotsProfiles();
  };

  return (
    <CreaterModal isOpen={toggle} toggle={() => setToggle(!toggle)}>
      <Form>
        <ProfileCreaterCard className="card-user" style={{ heght: '90vh' }}>
          <CardBody>
            <div className="author">
              <div className="block block-one" />
              <div className="block block-two" />
              <div className="block block-three" />
              <div className="block block-four" />

              <ImageUploader
                imageFile={imageFile}
                setImageFile={setImageFile}
                defaultPreviewURL={defaultImageURL}
              />

              <FormGroup>
                <TextareaLabel>Name</TextareaLabel>
                <NameInput
                  value={name}
                  placeholder="Robot Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Personality</TextareaLabel>
                <TextareaInput
                  type="textarea"
                  value={personality}
                  placeholder="New Robot Personality"
                  onChange={(e) => setPersonality(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Extra Prompts</TextareaLabel>
                <TextareaInput
                  type="textarea"
                  value={extra}
                  placeholder="Extra Prompts"
                  onChange={(e) => setExtra(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Options</TextareaLabel>
                <RobotOptions
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              </FormGroup>
            </div>
            <Row>
              {defaultStatus === 'UPDATE' && (
                <Col style={{ padding: '0 0 0 1em' }}>
                  <Button
                    onClick={handleDelete}
                    style={{ width: '100%', margin: '0em' }}
                    color="warning"
                  >
                    Delete
                  </Button>
                </Col>
              )}
              <Col>
                {uploadProgress > 0 ? (
                  <Progress value={uploadProgress} />
                ) : (
                  <Button
                    disabled={
                      uploadStatus !== 'UPDATE' && uploadStatus !== 'CREATE'
                    }
                    style={{ width: '100%', margin: '0em' }}
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {uploadStatus}
                  </Button>
                )}
              </Col>
            </Row>
          </CardBody>
        </ProfileCreaterCard>
      </Form>
    </CreaterModal>
  );
}

export default RobotProfileCreationCard;
