import React, { useState, useContext } from 'react';
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

import DropdownField from './DropdownField';
import FilterField from './FilterField';
import ImageUploader from './ImageUploader';
import RobotOptions from './RobotOptions';
import { RobotProfilesContext } from '../../contexts/RobotProfilesContext';
import { uploadImage } from '../../utils/storage';

const voiceList = [
  'Author (Neural)',
  'Amy (Standard)',
  'Amy (Neural)',
  'Emma (Standard)',
  'Emma (Neural)',
  'Brian (Standard)',
  'Brian (Neural)',
];

const modelList = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-0613',
  'gpt-3.5-turbo-16k',
  'gpt-3.5-turbo-16k-0613',
  'gpt-4',
  'gpt-4-0613',
  'gpt-4-32k',
  'gpt-4-32k-0613',
];

const CreaterModal = styled(Modal)`
  margin: auto;
  margin-top: -20vh;
  box-shadow: 0px 0px 100vw rgba(0, 0, 0, 1);
  background-color: transparent;
  border-radius: 1em;
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
  width: 100%;
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
  height: 30vh
  max-height: 30vh;
`;

export default function RobotProfileCreationCard({
  toggle,
  setToggle,
  defaultImageURL,
  defaultName,
  defaultPrompt,
  defaultOptions,
  defaultStatus,
  defaultFilters,
  defaultDescription,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(defaultName);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [description, setDescription] = useState(defaultDescription);
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(defaultStatus);
  const [selectedVoice, setSelectedVoice] = useState(voiceList[0]);
  const [selectedModel, setSelectedModel] = useState(modelList[0]);
  const [filters, setFilters] = useState(defaultFilters);
  const {
    robotProfiles,
    addRobotProfile,
    modifyRobotProfile,
    removeRobotProfile,
    fetchRobotProfiles,
  } = useContext(RobotProfilesContext);

  const resetAllStatus = () => {
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
    // Check if the name is already used
    if (robotProfiles.some((profile) => profile.name === name)) {
      errorMessage += 'Name is already used. ';
    }

    // Validate the prompt input
    if (prompt.trim() === '') {
      errorMessage += 'Prompt is required. ';
    }

    // If there are any validation errors, alert the user
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    let imageURL = defaultImageURL;
    if (imageFile) {
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
    const robotProfile = {
      name: name,
      prompt: prompt,
      options: selectedOptions,
      description: description,
      imageURL: imageURL,
      model: selectedModel,
      filters: filters,
    };
    setUploadStatus('Uploading profile...');
    console.log('robotProfile', robotProfile);
    if (defaultName !== '') {
      try {
        await modifyRobotProfile(defaultName, robotProfile);
      } catch (error) {
        console.error('Failed to upload profile:', error);
      }
    } else {
      try {
        await addRobotProfile(robotProfile);
      } catch (error) {
        console.error('Failed to upload profile:', error);
      } finally {
        setToggle(false);
      }
    }
    // reset all the states
    resetAllStatus();
    await fetchRobotProfiles();
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      setUploadStatus('Deleting profile...');
      await removeRobotProfile(defaultName);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    } finally {
      setToggle(false);
    }
    // reset all the states
    // resetAllStatus();
    fetchRobotProfiles();
  };

  return (
    <CreaterModal isOpen={toggle} toggle={() => setToggle(!toggle)}>
      <Form>
        <ProfileCreaterCard className="card-user">
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
                <Row>
                  <Col style={{ padding: '0 1em' }}>
                    <TextareaLabel>Name</TextareaLabel>
                    <NameInput
                      disabled={defaultStatus === 'UPDATE'}
                      value={name}
                      placeholder="Robot Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col style={{ padding: '0' }}>
                    <TextareaLabel>Voice</TextareaLabel>
                    <DropdownField
                      itemList={voiceList}
                      selectedItem={selectedVoice}
                      setSelectedItem={setSelectedVoice}
                    />
                  </Col>
                  <Col style={{ padding: '0 1em' }}>
                    <TextareaLabel>Model</TextareaLabel>
                    <DropdownField
                      itemList={modelList}
                      selectedItem={selectedModel}
                      setSelectedItem={setSelectedModel}
                    />
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Description</TextareaLabel>
                <TextareaInput
                  type="textarea"
                  value={description}
                  placeholder="Description for the robot"
                  style={{ height: '6vh', maxHeight: '6vh' }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Prompt</TextareaLabel>
                <TextareaInput
                  type="textarea"
                  value={prompt}
                  placeholder="Prompt (You can use {input} to access the input text)"
                  style={{ height: '20vh', maxHeight: '20vh' }}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Options</TextareaLabel>
                <RobotOptions
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              </FormGroup>

              <FormGroup>
                <TextareaLabel>Filter</TextareaLabel>
                <FilterField filters={filters} setFilters={setFilters} />
              </FormGroup>
            </div>

            <hr style={{ margin: '1em 0' }} />

            <Row>
              {defaultStatus === 'UPDATE' && uploadStatus === 'UPDATE' && (
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
