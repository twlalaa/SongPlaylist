"use strict";

const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

// Data
const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
];

let isPlaying = false;
let songIndex = 0;

const playSong = () => {
  songEl.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};

const pauseSong = () => {
  songEl.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex == songs.length) {
    songIndex = 0;
  }
  displaySong(songs[songIndex]);
  playSong();
  displaySongList();
  volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  songEl.muted = false;
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  displaySong(songs[songIndex]);
  playSong();
  displaySongList();
  volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  songEl.muted = false;
});

const displaySong = ({ name, artist, title }) => {
  songEl.src = `audio/${name}.mp3`;
  imageEl.src = `images/${name}.jpeg`;
  artistEl.textContent = artist;
  titleEl.textContent = title;
};

songEl.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target;
  if (!duration) return;

  const minute = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  const cuurentMinute = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);

  durationEl.innerText = `${minute}:${String(seconds).padStart(2, "0")}`;
  currentTimeEl.innerText = `${cuurentMinute}:${String(currentSeconds).padStart(
    2,
    "0"
  )}`;
  const progress = (currentTime / duration) * 100;
  progressEl.style.width = `${progress}%`;
  const changeSong = () => {
    if (currentTime == duration) {
      songIndex++;

      displaySong(songs[songIndex]);
      displaySongList();
      progressEl.style.width = "0";
      playSong();
      volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      songEl.muted = false;
    }
  };
  setTimeout(changeSong, 1000);
});

progressContainerEl.addEventListener("click", (e) => {
  const {
    offsetX: clicked,
    target: { clientWidth },
  } = e;
  const { duration } = songEl;

  const clickedDuration = (clicked / clientWidth) * duration;
  songEl.currentTime = clickedDuration;
  progressEl.style.width = `${(clicked / clientWidth) * 100}%`;
});

const lis = [];
const displaySongList = () => {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");

    li.className =
      "hover:font-bold text-xs flex justify-between mb-2 cursor-pointer ";

    const name = document.createElement("span");
    name.textContent = song.title;
    const time = document.createElement("span");
    time.textContent = song.duration;

    li.append(name);
    li.append(time);
    lis.push(li);

    playlist.append(li);
    if (songIndex === index) {
      li.classList.add("font-bold", "text-red-600");
    } else {
      li.classList.remove("font-bold", "text-red-600");
    }

    li.addEventListener("click", () => {
      songIndex = index;
      displaySong(songs[index]);
      progressEl.style.width = "0";
      playSong();
      displaySongList();
    });
  });
};

displaySongList();

const volumeBtn = document.querySelector(".volumeBtn");

volumeBtn.addEventListener("click", () => {
  if (volumeBtn.innerHTML == `<i class="fa-solid fa-volume-xmark"></i>`) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    songEl.muted = false;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    songEl.muted = true;
  }
});

const fiveBefore = document.getElementById("fiveBefore");
const fiveAfter = document.getElementById("fiveAfter");

fiveBefore.addEventListener("click", () => {
  songEl.currentTime -= 5;
});

fiveAfter.addEventListener("click", () => {
  songEl.currentTime += 5;
});
