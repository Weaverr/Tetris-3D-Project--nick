// The setVolume function updates the volume of the currently playing song based on the value of the volume slider.
function setVolume() {
  // Get the volume value from the volumeSlider element.
  let volume = volumeSlider.value();

  // Check if there is a currently playing song.
  if (currentSong && isMuted == false) {
    // Set the volume of the current song to the selected value.
    currentSong.setVolume(volume);
  }
}

// The toggleMute function allows toggling the mute state of the currently playing song.

function toggleMute() {
  // Check if the audio is currently muted.
  if (isMuted) {
    // If muted, restore the previous volume (0.5) and update the button label.
    currentSong.setVolume(0.5); // Restore previous volume
    muteButton.html('Mute');
    isMuted = false;
  } else {
    // If not muted, mute the song (volume set to 0) and update the button label.
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

// The playMusic function is used to play background music.

function playMusic() {
  // Check if the current song is not already playing.
  if (!currentSong.isPlaying()) {
    currentSong.loop(); // Loop the song to play it continuously.
  }
}
