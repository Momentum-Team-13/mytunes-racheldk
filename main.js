const search = document.getElementById("searchButton");
let resultBox = document.querySelector(".resultBox");
const form = document.querySelector("#myForm");
// console.log("songCard made");
const inputField = document.querySelector("#searchBar");
const player = document.querySelector("#audioPlayer");
const now = document.querySelector("#now")

form.addEventListener("submit", function (event) {
  //submit  handles submission by click and by enter (and any other accessibility tools used)
  resultBox.innerHTML = "";

  event.preventDefault();
  //what does preventDefault do? default behavior is for the page to reload, which we don't want because the results will go away until we ask them to with a new search
  getResults(inputField.value);
  console.log(inputField.value);
});

function getResults(term) {
  let url = `https://itunes.apple.com/search?term=${term.replaceAll(" ", "+")}`;
  console.log(url);
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/JSON" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      song(data.results);
    })
    .catch(err => {
        console.error(err)
        alert('Uh oh! Something went wrong: ' + err)
    });

  //~~~~~ if/else function for error message
}
function song(results) {
  for (let song of results) {
    resultBox.appendChild(addSong(song));
  }
}

function addSong(song) {
  let songCard = document.createElement("div");
  songCard.classList.add("songCard");
  let artwork = document.createElement("img");
  artwork.src = song.artworkUrl100;
  artwork.alt = `${song.collectionName} album art`;
  songCard.appendChild(artwork);
  // console.log("artwork made");

  let title = document.createElement("div");
  title.classList.add("title");
  title.innerText = `${song.trackName}`;
  songCard.appendChild(title);
  // console.log(title);

  // let album = document.createElement('div');
  // album.classList.add("album");
  // album.innerText = `${song.collectionName}`;
  // songCard.appendChild(album);
  // console.log(album)

  let audio = document.createElement("audio");
  audio.classList.add("audio");
  audio.src = song.previewUrl;
  songCard.appendChild(audio);
  // console.log("audio file")

  let artist = document.createElement("div");
  artist.classList.add("artist");
  artist.innerText = song.artistName;
  songCard.appendChild(artist);
  // console.log(artist);

  return songCard;
}

resultBox.addEventListener("click", function(event){
    let target = event.target; 
    console.log(target)

    //put functions here
})

function playSong(targetClicked) {
    player.src = `${targetClicked.src}`;
    console.log
    now.innerText = `Now Playing: ${targetClicked.trackName} by ${targetClicked.artistName}`

    // ??might have to clear the current audio.src first
}

//~~~make a function to change the audio source and the inner text of Now playing 

//~~~fix formatting so the long song titles don't mess stuff up 