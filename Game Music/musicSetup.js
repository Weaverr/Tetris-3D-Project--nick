function setVolume() {
    let volume = volumeSlider.value();
    if (currentSong) {
        currentSong.setVolume(volume);
    }
  }
  
  function toggleMute() {
    if (isMuted) {
        currentSong.setVolume(0.5); // Restore previous volume
        muteButton.html('Mute');
        isMuted = false;
    } else {
        currentSong.setVolume(0); // Mute the song
        muteButton.html('Unmute');
        isMuted = true;
    }
  }
  
  function changeTrack() {
    let selectedTrack = trackSelector.value();
    if (selectedTrack === 'Track 1 (Original)') {
      // added line below due to issue with mute and unmute
      muteButton.html('Mute');
      option2.stop();
      option2.stop();
      currentSong = option1;
      option1.loop();
    } else if (selectedTrack === 'Track 2') {
      muteButton.html('Mute');
      option1.stop();
      option3.stop();
      currentSong = option2;
      option2.loop();
    } else if (selectedTrack === 'Track 3'){
      muteButton.html('Mute');
      option1.stop();
      option2.stop();
      currentSong = option3;
      option3.loop(); 
    }
    setVolume(); // Update volume for the new track
  }

function playMusic() {
    if (!currentSong.isPlaying()) {
      currentSong.loop(); // Loop the song
    }
}