const search = document.getElementById("searchButton");
let resultBox = document.querySelector(".resultBox");
// console.log("songCard made");

// submit.addEventListener("click", function (event){
    //     ///something here to make the result be part of the fetch?
    //     console.log("search clicked")
    //     //initiate whatever logic thing to replace spaces with plusses
    //     return term
    //     let term = searchBar.replaceAll(" ", "+")
    // })
    
    let url = "https://itunes.apple.com/search?term=nada+surf&entity=song";
    //possible way to make the fetch url? `url${searchBar.text}&entity=song?
    //also going to need a logic thing to replace the spaces with pluses
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
    });
    
    function song(results) {
        for (let song of results) {
            resultBox.appendChild(addSong(song))
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
    
    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.innerText = song.artistName;
    songCard.appendChild(artist);
    // console.log(artist);
    
    return songCard
}
