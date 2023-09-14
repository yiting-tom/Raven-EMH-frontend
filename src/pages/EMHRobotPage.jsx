/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file EMHRobots.tsx
 * @author Yi-Ting Li <yitingli.public@gmail.com>
 * @description This component renders the EMH robot chat UI including the video player, chat history, and message sender components.
 */

import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useState, useContext } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { BarLoader } from 'react-spinners';
import { Card } from 'reactstrap';
import { styled } from 'styled-components';

import { sendChatMessage, fetchAllChatsByUserId } from 'api/chat';
import ChatHistory from 'components/ChatHistory/ChatHistory';
import MessageSender from 'components/MessageSender/MessageSender';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { usePrevious } from 'hooks/usePrevious';
import { color } from 'style';
import { useMediaQuery } from 'utils/animation';
import { base64ToBlobUrl } from 'utils/converter';

import { AuthContext } from '../contexts/AuthContext';

const EMHRobotContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
`;

const AvatarContainer = styled(Card)`
  border-radius: 1em;
  margin: 1em auto;
`;

const ChatHistoryContainer = styled(animated(Card))`
  border-radius: 1em;
  margin: 1em auto;
  overflow: hidden;
`;

const MessageSenderContainer = styled(Card)`
  border-radius: 1em;
  margin: 0em auto;
  padding: 1em;
`;

function EMHRobotPage() {
  // For data storage
  const [chats, setChats] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [message, setMessage] = useState('');

  // State for message sender & speech recognizer
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, listening
  const prevStatus = usePrevious(status);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // State for video player
  const [playerState, setPlayerState] = useState('idle'); // idle, playing, paused, ended
  const prevPlayerState = usePrevious(playerState);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // State for EMHRobot
  const [isFetchingChats, setIsFetchingChats] = useState(true);

  // Others
  const isMobile = useMediaQuery('(max-width: 768px)');
  const historySpring = useSpring({
    delay: isFullscreen ? 0 : 10,
    height: isFullscreen ? '0' : isMobile ? '32vh' : '42vh',
    opacity: isFullscreen ? '0' : '1',
    padding: isFullscreen ? '0' : '1em',
    margin: isFullscreen ? '0' : '1em auto',
  });
  const { currentUser } = useContext(AuthContext);

  // Handler
  // Handler for MessageSender.SpeechRecognizer
  const handleListening = (listeningState) => {
    if (listeningState) {
      SpeechRecognition.startListening();
      setStatus('listening');
    } else {
      SpeechRecognition.stopListening();
      setStatus('idle');
    }
  };

  // Fetch all chats from database at the beginning
  useEffect(() => {
    const userId = currentUser.uid;
    const fetchChats = async () => {
      const data = await fetchAllChatsByUserId(userId);
      if (!data) return;
      setChats(data);

      // Transform the last chat's video to blob url
      const lastChat = data[data.length - 1];
      if (lastChat) {
        const videoUrl = base64ToBlobUrl(lastChat.video);
        setVideoUrl(videoUrl);
      }
      setIsFetchingChats(false);
    };

    fetchChats();
  }, []);

  // Send the message to the backend and update the chats and videoRul states.
  const sendMessageFn = async () => {
    if (message.length < 2) return;

    const userId = currentUser.uid;
    const username = currentUser.displayName;
    const parentId = chats.length === 0 ? '' : chats[chats.length - 1].id;

    // Set status to 'sending'
    setStatus('sending');

    // Send the message to the backend
    const fetchedChats = await sendChatMessage(
      userId,
      username,
      message,
      parentId,
    );

    // Update the chats state by adding the new chat
    setChats([...chats, fetchedChats]);

    // Transform the last chat's video to blob url
    const lastChat = fetchedChats;
    if (lastChat) {
      const videoUrl = base64ToBlobUrl(lastChat.video);
      setVideoUrl(videoUrl);
    }

    // Set status to 'idle'
    setStatus('idle');
  };

  // If not listening, set status to 'idle'
  useEffect(() => {
    if (browserSupportsSpeechRecognition && !listening) setStatus('idle');
  }, [listening]);

  const afterRecognition = async () => {
    // keep listening
    if (
      browserSupportsSpeechRecognition &&
      message.length < 4 &&
      prevStatus === 'listening' &&
      status === 'idle'
    ) {
      handleListening(true);
      setStatus('listening');
      setPlayerState('paused');
      return;
    }
    // send message to backend
    if (
      browserSupportsSpeechRecognition &&
      message.length >= 2 &&
      prevStatus === 'listening' &&
      status === 'idle'
    ) {
      handleListening(false);
      sendMessageFn();
      return;
    }
  };

  // After recognizing the speech
  useEffect(() => {
    afterRecognition();
  }, [status]);

  // Pause the video when the message is being sent or the user is speaking
  useEffect(() => {
    if (listening) {
      setPlayerState('paused');
    }
  }, [listening]);

  useEffect(() => {
    if (
      browserSupportsSpeechRecognition &&
      start &&
      playerState === 'ended' &&
      status === 'idle'
    ) {
      handleListening(true);
    }
  }, [playerState]);

  return (
    <EMHRobotContainer className="content">
      <AvatarContainer className="card-user">
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
        </div>
        <VideoPlayer
          start={start}
          setStart={setStart}
          videoUrl={videoUrl}
          playerState={playerState}
          setPlayerState={setPlayerState}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
        />
      </AvatarContainer>

      <ChatHistoryContainer style={historySpring}>
        {isFetchingChats ? (
          <div style={{ margin: 'auto', width: '24vw' }}>
            <BarLoader
              color={color.primaryA(0.6)}
              height={'0.5em'}
              width={'100%'}
              speedMultiplier={0.3}
            />
          </div>
        ) : (
          <ChatHistory chats={chats} />
        )}
      </ChatHistoryContainer>

      <MessageSenderContainer>
        <MessageSender
          start={start}
          setStart={setStart}
          status={status}
          setStatus={setStatus}
          prevStatus={prevStatus}
          message={message}
          setMessage={setMessage}
          sendMessageFn={sendMessageFn}
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          chats={chats}
          setChats={setChats}
          playerState={playerState}
          setPlayerState={setPlayerState}
          transcript={transcript}
          listening={listening}
          browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
          handleListening={handleListening}
        />
      </MessageSenderContainer>
    </EMHRobotContainer>
  );
}

export default EMHRobotPage;
