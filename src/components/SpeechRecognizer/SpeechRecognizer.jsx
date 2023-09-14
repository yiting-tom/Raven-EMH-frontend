/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiPlus } from 'react-icons/bi';
import { BsMic } from 'react-icons/bs';
import { MdKeyboardCommandKey } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';

import { SendButton } from 'components/MessageSender/MessageSender';

const SpeechRecognizer = ({
  start,
  setStart,
  status,
  setStatus,
  message,
  setMessage,
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
  useHotkeys('ctrl+v', () => handleListening(!listening));

  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <SendButton
        disabled
        className="send-button"
        style={{ fontSize: '0.8em', color: 'white' }}
      >
        Browser does not support speech recognition.
      </SendButton>
    );
  }

  return (
    <SendButton
      className="send-button"
      disabled={status === 'sending' || playerState === 'playing'}
      onClick={() => {
        if (browserSupportsSpeechRecognition) handleListening(!listening);
        setStart(true);
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
    </SendButton>
  );
};

// 5. Default Export
export default SpeechRecognizer;
