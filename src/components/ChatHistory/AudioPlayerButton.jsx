import React, { useState, useRef, useEffect } from 'react';
import { BiSolidUserVoice } from 'react-icons/bi';

import { base64ToBlobUrl } from '../../utils/converter';

const AudioPlayerButton = ({ base64Audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(base64ToBlobUrl(base64Audio)));

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update the state when audio ends
  useEffect(() => {
    // Update the state when audio ends
    audioRef.current.onended = () => setIsPlaying(false);

    // Clean up the event listener when the component unmounts
    return () => {
      audioRef.current.onended = null;
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      className={`btn ${isPlaying ? 'btn-info' : 'btn-secondary'}`}
      style={{ padding: '4px 6px', margin: '0 0.6em 0 0' }}
    >
      <BiSolidUserVoice style={{ fontSize: '24px' }} />
    </button>
  );
};

export default AudioPlayerButton;
