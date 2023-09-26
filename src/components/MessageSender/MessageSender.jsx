import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiPlus, BiSend } from 'react-icons/bi';
import { MdKeyboardCommandKey, MdKeyboardReturn } from 'react-icons/md';
import { RiseLoader } from 'react-spinners';
import { Button, Input, Row, Col } from 'reactstrap';
import { styled } from 'styled-components';

import SpeechRecognizer from 'components/SpeechRecognizer/SpeechRecognizer';
import { devices } from 'style';

const MessageSenderContainer = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* padding-bottom: 1rem; */
  /* padding-top: 2rem; */
  /* margin: auto; */
`;

export const SendButton = styled(Button)`
  font-size: 1.2em;
  width: 100%;
  height: 100%;
  &.send-button {
    margin: auto;
    padding: 0.3em;
  }
`;
const UserInputArea = styled(Input)`
  font-size: 1em;
  width: 100%;
  height: 100%;
  border-radius: 0.5em;
  &.user-input-area {
    padding: 1.3em;
  }
`;
const ButtonCol = styled(Col)`
  &.button-col {
    padding-left: 0em;
    @media not ${devices.md} {
      padding: 1em 1em 0;
    }
  }
`;

const MessageSender = ({
  start,
  setStart,
  status,
  setStatus,
  message,
  setMessage,
  sendMessageFn,
  videoUrl,
  setVideoUrl,
  chats,
  setChats,
  playerState,
  setPlayerState,
  transcript,
  listening,
  browserSupportsSpeechRecognition,
  handleListening,
}) => {
  const userInputAreaRef = React.useRef(null);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await sendMessageFn();
    setPlayerState('playing');
    setStatus('idle');
    setStart(true);
    setMessage('');
  };

  useHotkeys('ctrl+enter', handleSubmit, [message]);

  return (
    <MessageSenderContainer className="">
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md="8" xs="12">
            <UserInputArea
              ref={userInputAreaRef}
              className="user-input-area"
              placeholder="SEND A MESSAGE OR PRESS ⌘ + V TO START LISTENING"
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Col>
          <ButtonCol md="2" xs="6" className="button-col">
            <SpeechRecognizer
              start={start}
              setStart={setStart}
              status={status}
              setStatus={setStatus}
              message={message}
              setMessage={setMessage}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              chats={chats}
              setChats={setChats}
              playerState={playerState}
              setPlayerState={setPlayerState}
              transcript={transcript}
              listening={listening}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
              handleListening={handleListening}
            />
          </ButtonCol>
          <ButtonCol md="2" xs="6" className="button-col">
            <SendButton
              className="send-button btn-primary"
              disabled={status === 'sending'}
              type="submit"
            >
              {status === 'sending' ? (
                <RiseLoader size="0.5em" color="white" />
              ) : (
                <span>
                  <BiSend size="1.6em" />
                  <br />
                  <span style={{ fontSize: '0.8em' }}>
                    <MdKeyboardCommandKey /> <BiPlus /> <MdKeyboardReturn />
                  </span>
                </span>
              )}
            </SendButton>
          </ButtonCol>
        </Row>
      </form>
    </MessageSenderContainer>
  );
};

export default MessageSender;
