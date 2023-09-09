/* eslint-disable @typescript-eslint/no-unused-vars */
import { animated, useSpring } from '@react-spring/web';
import React, { useState, useEffect } from 'react';
import {
  Fullscreen,
  FullscreenExit,
  Play,
  Pause,
  Repeat,
} from 'react-bootstrap-icons';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button, Row } from 'reactstrap';
import { styled } from 'styled-components';

import Avatar from 'assets/img/avatar.png';
import { useMediaQuery } from 'utils/animation';

const VideoPlayerContainer = styled.div`
  margin: 0 auto;
`;
const ControlGroup = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin: auto;
`;
const ControlButton = styled(Button)`
  padding: 0.75em 2em;
  font-size: 1em;
`;

/**
 * VideoPlayer component renders a video or avatar with controls
 * for play, pause, replay and fullscreen functionalities.
 *
 * @param {*} props - videoUrl, isAutoPlay, setIsAutoPlay, isFullscreen,
 *                    setIsFullscreen.
 * @returns JSX.Element
 */
const VideoPlayer = ({
  start,
  setStart,
  videoUrl,
  playerState,
  setPlayerState,
  isFullscreen,
  setIsFullscreen,
}) => {
  const playerRef = React.useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const avatarSpring = useSpring({
    height: !isFullscreen ? '216px' : isMobile ? '400px' : '600px',
    width: !isFullscreen ? '220px' : isMobile ? '410px' : '600px',
    marginTop: isFullscreen ? '2em' : '0em',
    borderRadius: '1em',
    overflow: 'hidden',
  });

  // Keybindings for fullscreen, play, and replay
  useHotkeys('f', () => setIsFullscreen(!isFullscreen));
  useHotkeys('p', () => setPlayerState('playing'));
  useHotkeys('r', () => replayVideo());

  const handleFullscreen = () => setIsFullscreen(!isFullscreen);
  const replayVideo = () => {
    if (videoUrl === null || !playerRef.current) return;
    playerRef.current.currentTime = 0;
    playerRef.current.play();
  };

  // Event listeners to track the video's play and pause states
  useEffect(() => {
    const videoElement = playerRef.current;

    const handlePlay = () => {
      setPlayerState('playing');
    };
    const handlePause = () => {
      setPlayerState('paused');
    };
    const handleEnded = () => {
      setPlayerState('ended');
    };

    if (videoElement) {
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('ended', handleEnded);
    }

    // Cleanup function
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const handlePlaying = () => {
    if (videoUrl === null) return;
    setPlayerState(playerState === 'playing' ? 'paused' : 'playing');
  };

  useEffect(() => {
    if (playerRef.current === null) return;

    switch (playerState) {
      case 'playing':
        playerRef.current.play();
        break;
      case 'paused':
        playerRef.current.pause();
        break;
      case 'ended':
        playerRef.current.pause();
        break;
      default:
        break;
    }
  }, [playerState]);

  return (
    <>
      <VideoPlayerContainer>
        {videoUrl === null ? (
          <animated.img src={Avatar} style={avatarSpring} />
        ) : (
          <animated.div style={avatarSpring}>
            <video
              onEnded={() => setPlayerState('ended')}
              autoPlay={start}
              width="100%"
              height="100%"
              ref={playerRef}
              src={videoUrl}
              controls={false}
            />
          </animated.div>
        )}
      </VideoPlayerContainer>

      <ControlGroup style={{ padding: '0.5em 0' }}>
        <ControlButton onClick={replayVideo} title="Replay (R)">
          <Repeat />
        </ControlButton>
        <ControlButton
          onClick={handlePlaying}
          title={playerState === 'playing' ? 'Pause (P)' : 'Play (P)'}
          className={playerState === 'playing' ? 'btn-primary' : ''}
        >
          {playerState === 'playing' ? <Pause /> : <Play />}
        </ControlButton>
        <ControlButton
          onClick={handleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          className={isFullscreen ? 'btn-primary' : ''}
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </ControlButton>
      </ControlGroup>
    </>
  );
};

export default VideoPlayer;
