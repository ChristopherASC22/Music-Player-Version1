// Get references to the DOM elements
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const stopButton = document.getElementById("stopButton");
const shuffleButton = document.getElementById("shuffleButton");
const volumeSlider = document.getElementById("volumeSlider");
const seekSlider = document.getElementById("seekSlider");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");

// Create a playlist array that contains objects with metadata about each song
const playlist = [
    {
        title: "CLOSE",
        artist: "Rae Sremmurda, Swae Lee, & Travis Scott",
        album: "Swaecation",
        src: "music/Rae Sremmurd, Swae Lee, Slim Jxmmi - CLOSE (Audio) ft. Travis Scott.mp3"
      },
    {
        title: "Lost Angels",
        artist: "Rae Sremmurda & Swae Lee",
        album: "Swaecation",
        src: "music/Lost Angels (From Swaecation).mp3"
      },
      {
        title: "Rewind",
        artist: "Fetty Wap",
        album: "Fetty Wap (Deluxe)",
        src: "music/Fetty Wap - Rewind feat. Monty (HQ).mp3"
      },
      {
        title: "The Way Life Goes",
        artist: "Lil Uzi Vert & Oh Wonder",
        album: "Luv Is Rage 2",
        src: "music/Lil Uzi Vert - The Way Life Goes [Official Visualizer].mp3"
      },
      {
        title: "The Thrill",
        artist: "Wiz Khalifa",
        album: "The Thrill",
        src: "music/Wiz Khalifa - The Thrill [Official Audio].mp3"
      },
      {
        title: "What about Me?",
        artist: "Lil Wayne",
        album: "Tha Carter V",
        src: "music/What About Me.mp3"
      },
      {
        title: "Bedtime Stories",
        artist: "Rae Sremmurda & The Weeknd",
        album: "Swaecation",
        src: "music/Bedtime Stories.mp3"
      },
      {
        title: "Feels",
        artist: "Calvin Harris, Pharrell Williams, Katy Perry, & Big Sean",
        album: "Funk Wav Bounces Vol. 1",
        src: "music/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean.mp3"
      },
      {
        title: "Demon High",
        artist: "Lil Uzi Vert",
        album: "Demon High",
        src: "music/Lil_Uzi_Demon_High.mp3"
      },
      {
        title: "One Right Now",
        artist: "Post Malone & The Weeknd",
        album: "One Right Now",
        src: "music/Post Malone, The Weeknd - One Right Now (Audio).mp3"
      },
      {
        title: "Power Trip",
        artist: "J Cole",
        album: "Born Sinner",
        src: "music/Power Trip.mp3"
      },
      {
        title: "Powerglide",
        artist: "Rae Srmmurda, Juicy J & Swae Lee",
        album: "Swaecation",
        src: "music/Rae Sremmurd, Swae Lee, Slim Jxmmi - Powerglide (Audio) ft. Juicy J.mp3"
      },
      {
        title: "These Worries",
        artist: "Kid Cudi",
        album: "Man On The Moon II: The Legend of Mr. Rager",
        src: "music/These Worries.mp3"
      },
      {
        title: "Fallin' Apart",
        artist: "Young Franco Ft. Denzel Curry",
        album: "Fallin' Apart",
        src: "music/Young Franco - Fallin' Apart (Visualiser) ft. Denzel Curry, Pell.mp3"
      },

  // Add more songs here...
];

// Create a variable to keep track of the current song index
let currentSongIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    audioPlayer.load();
    currentTime.innerText="0:00";
    totalTimeDisplay.innerText = formatTime(audioPlayer.duration)
}

// Function to play the current song
function playSong() {
  audioPlayer.src = playlist[currentSongIndex].src;
  audioPlayer.play();
  playButton.textContent = "Pause";
}

// Function to pause the current song
function pauseSong() {
  audioPlayer.pause();
  playButton.textContent = "Play";
}

// Function to stop the current song
function stopSong() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  playButton.textContent = "Play";
}

// Function to shuffle the playlist
function shufflePlaylist() {
  // Use the Fisher-Yates shuffle algorithm to shuffle the playlist
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
  }
  // Reset the current song index to 0 and play the first song
  currentSongIndex = 0;
  playSong();
}


// Add event listeners to the buttons and input sliders
playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
});
stopButton.addEventListener("click", stopSong);
shuffleButton.addEventListener("click", shufflePlaylist);
volumeSlider.addEventListener("input", () => {
  audioPlayer.volume = volumeSlider.value / 100;
});
seekSlider.addEventListener("input", () => {
  audioPlayer.currentTime = audioPlayer.duration * (seekSlider.value / 100);
});
audioPlayer.addEventListener("timeupdate", () => {
  // Update the seek slider position and the current time display
  seekSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
});
audioPlayer.addEventListener("durationchange", () => {
  // Update the total time display
  totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// Function to format the time in seconds as mm:ss
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

audioPlayer.addEventListener("ended", () => {
    if (isShuffleOn) {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      loadTrack(currentTrackIndex);
      playTrack();
    } else {
      stopTrack();
    }
  });