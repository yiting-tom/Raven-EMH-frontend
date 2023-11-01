/**
 * @file EMHRobots.tsx
 * @author Yi-Ting Li <yitingli.public@gmail.com>
 * @description This component renders the EMH robot chat UI including the video player, chat history, and message sender components.
 */

import { useSpring, animated } from '@react-spring/web';
import { Carousel } from '@trendyol-js/react-carousel';
import React, { useEffect, useState, useContext } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Rings } from 'react-loader-spinner';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { BarLoader } from 'react-spinners';
import { Card, Modal } from 'reactstrap';
import { styled } from 'styled-components';

import { usePrevious } from 'hooks/usePrevious';
import { color } from 'style';
import { useMediaQuery } from 'utils/animation';
import { base64ToBlobUrl } from 'utils/converter';

import { sendChatMessage, fetchAllChatsByUserIdAndRobotId } from '../api/chat';
import ChatHistory from '../components/ChatHistory/ChatHistory';
import MessageSender from '../components/MessageSender/MessageSender';
import DisplayRobotProfileCard from '../components/RobotProfileCard/DisplayRobotProfileCard';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import { AuthContext } from '../contexts/AuthContext';
import { RobotProfilesContext } from '../contexts/RobotProfilesContext';
import { detectBrowser } from '../utils/browser';

const CarouselModal = styled(Modal)`
  border-radius: 1em;
  max-width: 100vw;
  max-width: 1024px;
  width: 100vw;
  box-shadow: none;
  .modal-content {
    @media (min-width: 992px) {
      left: 16.5%;
    }
    background-color: transparent;
    border-radius: 1em;
  }
`;

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
  const { robotProfiles } = useContext(RobotProfilesContext);
  const [selectedRobotId, setSelectedRobotId] = useState(
    Object.keys(robotProfiles)[0],
  );
  const [isFetchingRobotsProfiles, setIsFetchingRobotsProfiles] =
    useState(true);

  // State for message sender & speech recognizer
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, sending, listening
  const prevStatus = usePrevious(status);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [browserIsChrome, setBrowserIsChrome] = useState(false);

  useEffect(() => {
    setBrowserIsChrome(detectBrowser() === 'Chrome');
  }, []);

  // State for video player
  const [playerState, setPlayerState] = useState('idle'); // idle, playing, paused, ended
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
  const [toggle, setToggle] = useState(false);

  // Handler
  // Handler for MessageSender.SpeechRecognizer
  const handleListening = (listeningState) => {
    console.log(`handleListening.status: ${listeningState}`);
    if (listeningState) {
      SpeechRecognition.startListening();
      setStatus('listening');
    } else {
      SpeechRecognition.stopListening();
      setStatus('idle');
    }
  };

  useEffect(() => {
    console.warn(`listening: ${listening}`);
  }, [listening]);

  const sendFetchChatsRequest = async () => {
    const userId = currentUser.uid;
    const data = await fetchAllChatsByUserIdAndRobotId(userId, selectedRobotId);

    setIsFetchingChats(false);
    if (!data) return;
    setChats(data);

    // Transform the last chat's video to blob url
    const lastChat = data[data.length - 1];
    if (lastChat && lastChat.video_base64) {
      const videoUrl = base64ToBlobUrl(lastChat.video_base64);
      setVideoUrl(videoUrl);
    } else {
      setVideoUrl(null);
    }
  };

  // Fetch all chats from database when selected robot is changed
  useEffect(() => {
    sendFetchChatsRequest();
  }, [selectedRobotId]);

  useEffect(() => {
    if (Object.keys(robotProfiles).length > 0) {
      setIsFetchingRobotsProfiles(false);
    }
    setSelectedRobotId(Object.keys(robotProfiles)[0]);
  }, [robotProfiles]);

  // Send the message to the backend and update the chats and videoRul states.
  const sendMessageFn = async () => {
    if (message.length < 2) return;

    const userId = currentUser.uid;
    const username = currentUser.displayName;
    const parentId = chats.length === 0 ? '' : chats[chats.length - 1].id;

    // Set status to 'sending'
    setStatus('sending');

    // Send the message to the backend
    const history = chats.reduce((accumulator, chat) => {
      return accumulator.concat([chat.request, chat.response]);
    }, []);

    const chatResponse = await sendChatMessage(
      {
        user_id: userId,
        parent_id: parentId,
        username: username,
        message: message,
        history: history,
      },
      {
        robot_id: selectedRobotId,
        ...robotProfiles[selectedRobotId],
      },
    );

    // Transform the last chat's video to blob url
    const lastChat = chatResponse;
    if (lastChat) {
      const videoUrl = base64ToBlobUrl(lastChat.video_base64);
      setVideoUrl(videoUrl);
      // Update the chats state by adding the new chat
      setChats([...chats, lastChat]);
    }
  };

  // Pause the video when the message is being sent or the user is speaking
  useEffect(() => {
    if (listening) {
      setPlayerState('paused');
    }
  }, [listening]);

  return (
    <EMHRobotContainer className="content">
      {isFetchingRobotsProfiles &&
      robotProfiles[selectedRobotId] &&
      robotProfiles[selectedRobotId].imageURL ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}
        >
          <Rings
            height="30vh"
            width="30vh"
            color={color.primaryA(0.6)}
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
          <h1>Fetching Data...</h1>
        </div>
      ) : (
        <>
          <AvatarContainer className="card-user">
            <div className="author">
              <div className="block block-one" />
              <div className="block block-two" />
              <div className="block block-three" />
              <div className="block block-four" />
            </div>
            <VideoPlayer
              imageURL={
                robotProfiles[selectedRobotId] &&
                robotProfiles[selectedRobotId].imageURL
              }
              start={start}
              setStart={setStart}
              videoUrl={videoUrl}
              playerState={playerState}
              setPlayerState={setPlayerState}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
              setToggle={setToggle}
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
              <ChatHistory chats={chats} refetchChats={sendFetchChatsRequest} />
            )}
          </ChatHistoryContainer>

          <MessageSenderContainer>
            <MessageSender
              isFetchingChats={!isFetchingChats}
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
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition && browserIsChrome
              }
              handleListening={handleListening}
            />
          </MessageSenderContainer>

          <CarouselModal isOpen={toggle} toggle={() => setToggle(!toggle)}>
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '1em',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  paddingTop: '0.6em',
                  marginBottom: '-0.5em',
                }}
              >
                Choose your EMH Robot
              </h1>
              <Carousel
                dynamic={true}
                show={3}
                slide={1}
                swiping={true}
                rightArrow={
                  <BiRightArrow
                    size="2em"
                    type="button"
                    style={{ height: '100%', margin: '0 1em' }}
                  />
                }
                leftArrow={
                  <BiLeftArrow
                    size="2em"
                    type="button"
                    style={{ height: '100%', margin: '0 1em' }}
                  />
                }
              >
                {Object.entries(robotProfiles).map(([profileId, robot]) => (
                  <DisplayRobotProfileCard
                    onClick={() => {
                      setSelectedRobotId(profileId);
                    }}
                    {...robot}
                    key={profileId}
                    selected={profileId === selectedRobotId}
                  />
                ))}
              </Carousel>
            </div>
          </CarouselModal>
        </>
      )}
    </EMHRobotContainer>
  );
}

export default EMHRobotPage;
