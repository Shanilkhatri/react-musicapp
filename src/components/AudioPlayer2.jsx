import React, { useState, useRef } from 'react';

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  // Function to handle when audio ends
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  // Function to handle when audio starts playing
  const handleAudioPlay = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="your-audio-file-url.mp3"
        controls
        onPlay={handleAudioPlay}
        onPause={handleAudioEnd}
        onEnded={handleAudioEnd}
      />
      <div>
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
}

export default AudioPlayer;
