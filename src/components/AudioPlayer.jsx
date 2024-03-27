import React, { useState } from 'react';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Function to toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  // Function to handle time update
  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
    setDuration(event.target.duration);
  };

  return (
    <div>
      <audio
        src="your-audio-file-url.mp3"
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div>
        <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
      <div>
        <p>Current Time: {currentTime.toFixed(2)}</p>
        <p>Duration: {duration.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default AudioPlayer;
