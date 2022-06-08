const search = document.getElementById("searchButton");
let resultBox = document.querySelector(".resultBox");
const form = document.querySelector("#myForm");
const inputField = document.querySelector("#searchBar");
const player = document.querySelector("#audioPlayer");
player.volume = 0.5;
const now = document.querySelector("#now");
// const typeAll = document.querySelector("#searchType").options.item(0).text;
// const typeArtist = document.querySelector("#searchType").options.item(1).text;
// const typeSong = document.querySelector("#searchType").options.item(2).text;
// const typeAlbum = document.querySelector("#searchType").options.item(3).text;

form.addEventListener("submit", function (event) {
    resultBox.innerHTML = "";
    event.preventDefault();
    getResults(inputField.value);
    // console.log(inputField.value);
    const searchTypeArray = document.getElementById("searchType").options;
    let selectedType = searchTypeArray.options.
    console.log(`selectedType: ${selectedType}`)
    console.log(searchType)
    console.log (`searchType: ${searchType.value} has this many objects ${searchType.length}`)
});


// function adjustUrl (term) {
//     let
// }

function getResults(term) {
    let url = `https://itunes.apple.com/search?term=${term.replaceAll(
        " ",
        "+"
    )}&entity=song`;
    // console.log(url);
    fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/JSON" },
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("status code error: " + response.status);
            }
        })

        .then(function (data) {
            console.log(data.results);
            song(data.results);
            if (data.results.length === 0) {
                console.log("no results found");
                let noResults = document.createElement("div");
                noResults.classList.add("noResults");
                noResults.innerText = `No results found`;
                resultBox.appendChild(noResults);
            }
        });
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
    artwork.classList.add("artwork");
    artwork.src = song.artworkUrl100;
    artwork.alt = `${song.collectionName} album art`;
    songCard.appendChild(artwork);

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerText = `${song.trackName}`;
    songCard.appendChild(title);

    let audioSource = document.createElement("div");
    audioSource.classList.add("audio");
    audioSource.innerText = `${song.previewUrl}`;
    songCard.appendChild(audioSource);

    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.innerText = song.artistName;
    songCard.appendChild(artist);

    return songCard;
}

resultBox.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("songCard")) {
        console.log("target.classList");
        player.src = target.children[2].innerText;
        now.innerText = `Now Playing: ${target.children[1].innerText} by ${target.children[3].innerText}`;
        console.log("now playing updated");
    } else if (target.parentElement.classList.contains("songCard")) {
        console.log(target.parentElement.children);
        player.src = target.parentElement.children[2].innerText;
        now.innerText = `Now Playing: ${target.parentElement.children[1].innerText} by ${target.parentElement.children[3].innerText}`;
        console.log("now playing updated");
    }
});
