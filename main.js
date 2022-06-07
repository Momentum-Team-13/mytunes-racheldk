const search = document.getElementById("searchButton");
let resultBox = document.querySelector(".resultBox");
const form = document.querySelector("#myForm")
// console.log("songCard made");
const inputField = document.querySelector("#searchBar")

//TRYING TO DO THE FORM THING 
form.addEventListener( "submit", function (event){
    //submit  handles submission by click and by enter (and any other accessibility tools used)
    
        event.preventDefault();
        //what does preventDefault do? default behavior is for the page to reload, which we don't want because the results will go away until we ask them to with a new search
        getResults(inputField.value)
        console.log(inputField.value)
    });

    function getResults(term){
        let url = `https://itunes.apple.com/search?term=${term}&entity=song`;
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
        
    }
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

    // let album = document.createElement('div');
    // album.classList.add("album");
    // album.innerText = `${song.collectionName}`;
    // songCard.appendChild(album);
    // console.log(album)

    let audio = document.createElement('audio')
    audio.classList.add('audio')
    audio.src = song.previewUrl
    songCard.appendChild(audio)
    // console.log("audio file")
    
    let artist = document.createElement("div");
    artist.classList.add("artist");
    artist.innerText = song.artistName;
    songCard.appendChild(artist);
    // console.log(artist);
    
    return songCard
}

