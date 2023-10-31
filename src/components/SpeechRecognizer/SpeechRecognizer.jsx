import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiPlus } from 'react-icons/bi';
import { BsMic } from 'react-icons/bs';
import { MdKeyboardCommandKey } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';
import { Button } from 'reactstrap';
import { styled } from 'styled-components';

export const ButtonContainer = styled(Button)`
  font-size: 1.2em;
  width: 100%;
  height: 100%;
  &.send-button {
    margin: auto;
    padding: 0.3em;
  }
`;

const SpeechRecognizer = ({
  setStart,
  status,
  setMessage,
  playerState,
  transcript,
  listening,
  browserSupportsSpeechRecognition,
  handleListening,
}) => {
  useHotkeys('ctrl+v', () => handleListening(!listening));
  useHotkeys('meta+v', () => handleListening(!listening));

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <ButtonContainer
        disabled
        className="send-button"
        style={{ fontSize: '0.8em', color: 'white' }}
      >
        Browser does not support speech recognition.
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer
      className="send-button"
      disabled={status === 'sending'}
      onClick={() => {
        handleListening(!listening);
      }}
    >
      {listening ? (
        <ScaleLoader
          color="white"
          size="0.4"
          height="0.5em"
          width="0.6em"
          radius="3px"
        />
      ) : (
        <>
          <BsMic size="1.6em" /> <br />
          <span style={{ fontSize: '0.8em' }}>
            <MdKeyboardCommandKey /> <BiPlus /> V
          </span>
        </>
      )}
    </ButtonContainer>
  );
};

// 5. Default Export
export default SpeechRecognizer;
