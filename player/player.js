// fetching data
const url = "https://api-jiosaavn.vercel.app/song/?query=";
const right = document.querySelector(".right");
async function fetching(query) {
  const fetchData = await fetch(url + query);
  const data = await fetchData.json();
  const element = document.createElement("div");
  element.innerHTML = `<h2>${query[0].toUpperCase()+query.slice(1)}</h2>`;
  const elementList = document.createElement("div");
  elementList.className = "list";
  data.map((e) => {
      elementList.innerHTML += `<div class="music-card" release_date=${e.release_date} data-music=${e.media_url}>
      <img src=${e.image} alt="song - image">
      <p class="song">${e.song}</p>
      <p class="music">${e.music.slice(0,40)}...</p>
      </div>`;
    });
    element.append(elementList);
    return element;
}

async function addData(query) {
    const element=await fetching(query);
    right.append(element);
    addmusicCard();
}

const song=["tranding now","ram","hindi song","New song","how"];
song.forEach((e)=>{
   addData(e);
});

// search data
const searching=document.querySelector(".searching");
const search=document.querySelector(".search");
const searchBtn=document.querySelector("#search");
const searchQuary=document.querySelector("#searchQuary");
searchBtn.addEventListener("click",async(e)=>{
  e.preventDefault();
  if(!searchQuary.value)
  return;
  search.style.display="block";
  
    const fetchData = await fetch(url + searchQuary.value);
    const data = await fetchData.json();

  if(data.length==0||data.status==false){
    searching.innerHTML="sorry this song is not found!";
   setTimeout(()=>{
      searching.innerHTML="";
  search.style.display="none";
    },1000);
  }

  const elementList = document.createElement("div");
  elementList.className = "list";
  data.map((e) => {
      elementList.innerHTML += `<div class="music-card" release_date=${e.release_date} data-music=${e.media_url}>
      <img src=${e.image} alt="song - image">
      <p class="song">${e.song}</p>
      <p class="music">${e.music.slice(0,40)}...</p>
      </div>`;
    });
    searching.prepend(elementList);
    addmusicCard();
});

// player working
const play = document.querySelector(".controllers .play");
const back = document.querySelector(".controllers .back");
const forward = document.querySelector(".controllers .forward");
const musicPlay = document.querySelector("#music-play audio");
play.addEventListener("click", () => {
  const play1 = play.querySelector("i");
  if (play1.classList[1] == "fa-play") {
    musicPlay.play();
    play1.classList.replace("fa-play", "fa-pause");
  } else {
    musicPlay.pause();
    play1.classList.replace("fa-pause", "fa-play");
  }
});

setInterval(() => {
  if (musicPlay.duration === musicPlay.currentTime)
    play.classList.replace("fa-pause", "fa-play");
  document.documentElement.style.setProperty(
    "--music-width",
    `${(musicPlay.currentTime / musicPlay.duration) * 100}%`
  );
}, 400);

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
const closePlayer = document.querySelector(".close-player");
const showPlayer = document.querySelector(".player-show");
openPlayer.addEventListener("click", () => {
  showPlayer.style.display = "block";
});
closePlayer.addEventListener("click", () => {
  showPlayer.style.display = "none";
});

const avatar = document.querySelector(".avatar img");
const headback = document.querySelector(".head .back");
const cube_inner__front = document.querySelector(".cube_inner__front");
const details_album = document.querySelector(".details_album");
const details = document.querySelector(".details h2");
const titulo_song = document.querySelector(".titulo_song");
const duracao_song = document.querySelector(".duracao_song i");
async function addmusicCard() {
  let musicCard = document.querySelectorAll(".music-card");
  musicCard.forEach((e) => {
    e.addEventListener("click", () => {
      setimage(e);

      const play1 = play.querySelector("i");
    //   musicPlay.pause();
      play1.classList.replace("fa-pause", "fa-play");
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
  if(screen.width<350)
  cube_inner__front.style.backgroundImage = `url(${src})`;
  details_album.style.backgroundImage = `url(${src})`;
  avatar.src = src;
}


// left navigation
const searchP=document.querySelector(".search-p");
const homeP=document.querySelector(".home-p");
homeP.addEventListener("click",()=>{
 search.style.display="none";
});
searchP.addEventListener("click",()=>{
  searchQuary.focus();
});