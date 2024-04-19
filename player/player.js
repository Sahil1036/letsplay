
// fetching data
const url = "https://api-jiosaavn.vercel.app/song/?query=";
const key="?????????????????????";
const right = document.querySelector(".right");
async function fetching(query) {
  const fetchData = await fetch(url + query);
  const data = await fetchData.json();
  const element = document.createElement("div");
  // element.innerHTML = `<h2>${query[0].toUpperCase() + query.slice(1)}</h2>`;
  const elementList = document.createElement("div");
  elementList.className = "list";
  data.map((e) => {
    elementList.innerHTML += `<div class="music-card" release_date=${
      e.release_date
    } data-music=${e.media_url}>
      <img src=${e.image} alt="song - image">
      <p class="song">${e.song.slice(0, 15)} </p>
      <p class="music">${e.music.slice(0, 20)}...</p>
      </div>`;
  });
  element.append(elementList);
  return element;
}

async function addData(query) {
  const element = await fetching(query);
  const append = document.createElement("h2");
  append.innerHTML = `${query[0].toUpperCase() + query.slice(1)}`;
  element.prepend(append);
  right.append(element);
  addmusicCard();
}

const song = [
  "tranding now",
  "Today’s Top Hits",
  "All Out 2020s",
  "All Out 80s",
  "New song",
  "how",
  "Dinner with Friends",
  "Chillout Lounge",
  "Chill Hits",
  "Stress Relief",
  "Peaceful Piano",
];
song.forEach((e) => {
  addData(e);
});

// search data
const searching = document.querySelector(".searching");
const search = document.querySelector(".search");
const searchBtn = document.querySelector("#search");
const searchQuary = document.querySelector("#searchQuary");
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  library.style.display = "none";
  if (!searchQuary.value) return;
  search.style.display = "block";

  const fetchData = await fetch(url + searchQuary.value);
  const data = await fetchData.json();

  if (data.length == 0 || data.status == false) {
    searching.innerHTML = "sorry this song is not found!";
    setTimeout(() => {
      searching.innerHTML = "";
      search.style.display = "none";
    }, 1000);
  }

  const elementList = document.createElement("div");
  elementList.className = "list";
  data.map((e) => {
    elementList.innerHTML += `<div class="music-card" release_date=${
      e.release_date
    } data-music=${e.media_url}>
      <img src=${e.image} alt="song - image">
      <p class="song">${e.song}</p>
      <p class="music">${e.music.slice(0, 40)}...</p>
      </div>`;
  });
  searching.prepend(elementList);
  let element = searching.querySelectorAll(".list");
  if (element[3]) element[3].remove();
  addmusicCard();
  right.scrollTo(0, 0);
});

// player working
const play = document.querySelector(".controllers .play");
const back = document.querySelector(".controllers .back");
const forward = document.querySelector(".controllers .forward");
const musicPlay = document.querySelector("#music-play audio");
const progress = document.querySelector("#progress");
const duration = document.querySelector(".timeDuration .duration");
const current = document.querySelector(".timeDuration .current");
play.addEventListener("click", () => {
  playmusic();
});

function playmusic() {
  const play1 = play.querySelector("i");
  if (play1.classList[1] == "fa-play") {
    musicPlay.play();
    play1.classList.replace("fa-play", "fa-pause");
  } else {
    musicPlay.pause();
    play1.classList.replace("fa-pause", "fa-play");
  }
}

setInterval(() => {
  progress.max = musicPlay.duration;
  current.innerHTML = numToTime(musicPlay.currentTime);
  duration.innerHTML = numToTime(musicPlay.duration);
  if (musicPlay.duration === musicPlay.currentTime)
    play.querySelector("i").classList.replace("fa-pause", "fa-play");
  let progressvalue = (musicPlay.currentTime / musicPlay.duration) * 100;
  document.documentElement.style.setProperty(
    "--music-width",
    `${progressvalue}%`
  );
  progressvalue = (progressvalue * progress.offsetWidth) / 100;
  document.documentElement.style.setProperty(
    "--progress-width",
    `${progressvalue}px`
  );
  progress.value = musicPlay.currentTime;
}, 400);

// set current music location
progress.addEventListener("change", () => {
  musicPlay.currentTime = progress.value;
});

function numToTime(num) {
  // Calculate the hours and minutes.
  var hours = Math.floor(num / 60);
  var minutes = num % 60;

  // Add leading zeros if necessary.
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Return the time string.
  return (
    hours +
    ":" +
    `${
      Math.floor(minutes) > 9 ? Math.floor(minutes) : "0" + Math.floor(minutes)
    }`
  );
}

back.addEventListener("click", () => {
  musicPlay.currentTime -= 10;
  console.log(musicPlay.currentTime);
});

forward.addEventListener("click", () => {
  musicPlay.currentTime += 10;
  console.log(musicPlay.currentTime);
});

// full size player
const openPlayer = document.querySelector(".open-player");
const player = document.querySelector(".player");
const closePlayer = document.querySelectorAll(".close-player");
const showPlayer = document.querySelector(".player-show");
openPlayer.addEventListener("click", () => {
  showPlayer.style.display = "block";
  player.style.width = "100dvw";
  player.style.height = "30dvh";
  player.style.transform = "translateY(25px)";
});
closePlayer.forEach((e) => {
  e.addEventListener("click", () => {
    showPlayer.style.display = "none";
    player.style.width = "min(95%,500px)";
    player.style.transform = "translateY(0)";
  });
});

const avatar = document.querySelector(".avatar img");
const headback = document.querySelector(".head .back");
const cube_inner__front = document.querySelector(".cube_inner__front");
const details_album = document.querySelector(".details_album");
const details = document.querySelector(".details h2");
const titulo_song = document.querySelector(".titulo_song");
const duracao_song = document.querySelector(".duracao_song i");
const download = document.querySelector(".download a");
async function addmusicCard() {
  let musicCard = document.querySelectorAll(".music-card");
  musicCard.forEach((e) => {
    e.addEventListener("click", () => {
      setimage(e);
      const play1 = play.querySelector("i");
      musicPlay.play();
      play1.classList.replace("fa-play", "fa-pause");
    });
  });
}

function setimage(e) {
  const src = e.querySelector("img").src;
  details.innerHTML = `${e.querySelectorAll("p")[0].innerText}-${
    e.querySelectorAll("p")[1].innerText
  }`;
  titulo_song.innerHTML = `${e.querySelectorAll("p")[0].innerText}-${
    e.querySelectorAll("p")[1].innerText
  }`;
  duracao_song.innerHTML = `Release date - ${e.getAttribute("release_date")}`;
  musicPlay.src = e.getAttribute("data-music");
  headback.style.backgroundImage = `url(${src})`;
  if (screen.width < 400)
    cube_inner__front.style.backgroundImage = `url(${src})`;
  details_album.style.backgroundImage = `url(${src})`;
  avatar.src = src;
}

// left navigation
const searchP = document.querySelector(".search-p");
const homeP = document.querySelector(".home-p");
const pages = document.querySelectorAll(".pages");
const library = document.querySelector(".library");
const favourite = document.querySelector(".favourite");
homeP.addEventListener("click", () => {
  search.style.display = "none";
  library.style.display = "none";
  favourite.style.display = "none";
});
searchP.addEventListener("click", () => {
  library.style.display = "none";
  favourite.style.display = "none";
  searchQuary.focus();
});
pages[2].addEventListener("click", () => {
  library.style.display = "block";
  right.scrollTo(0, 0);
  search.style.display = "none";
  favourite.style.display = "none";
});
pages[3].addEventListener("click", () => {
  right.scrollTo(0, 0);
  favourite.style.display = "block";
  library.style.display = "none";
  search.style.display = "none";
});
const element = await fetching("Today’s Top Hits");
library.append(element);
addmusicCard();
