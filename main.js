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
  let url = `https://itunes.apple.com/search?term=${term.replaceAll(" ", "+")}&entity=song`;
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
      if (data.results.length === 0) {
        //   alert('No results found')
          console.log('no results found')
          let noResults = document.createElement('div')
          noResults.classList.add("noResults")
          noResults.innerText = `No results found`
          resultBox.appendChild(noResults)
      }
    })
    .catch(err => {
        console.error(err)
        alert('Uh oh! Something went wrong: ' + err)
    })
    
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
  artwork.classList.add("artwork")
  artwork.src = song.artworkUrl100;
  artwork.alt = `${song.collectionName} album art`;
  songCard.appendChild(artwork);
  // console.log("artwork made");

  let title = document.createElement("div");
  title.classList.add("title");
  title.innerText = `${song.trackName}`;
  songCard.appendChild(title);
  // console.log(title);
  
  let audioSource = document.createElement("div");
  audioSource.classList.add("audio");
  audioSource.innerText = `${song.previewUrl}`;
  songCard.appendChild(audioSource);
  // console.log("audio file")

  let artist = document.createElement("div");
  artist.classList.add("artist");
  artist.innerText = song.artistName;
  songCard.appendChild(artist);
  // console.log(artist);
  
  // let album = document.createElement('div');
  // album.classList.add("album");
  // album.innerText = `${song.collectionName}`;
  // songCard.appendChild(album);
  // console.log(album)

  return songCard;
}

resultBox.addEventListener("click", function(event) {
    let target = event.target;
    console.log(target)
    console.log(target.parentElement)
    if (target.parentElement.classList.contains("songCard")) {
        console.log(target.parentElement.children)
        player.src = target.parentElement.children[2].innerText
        now.innerText = `Now Playing: ${target.parentElement.children[1].innerText} by ${target.parentElement.children[3].innerText}` 
        console.log("now playing updated")
    } else if (target.classList.contains("songCard")) {
        console.log("target.classList")
        player.src = target.children[2].innerText
        now.innerText = `Now Playing: ${target.children[1].innerText} by ${target.children[3].innerText}` 
        console.log("now playing updated")
    }
}) 



//~~~fix formatting so the long song titles don't mess stuff up 