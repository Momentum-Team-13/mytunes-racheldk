const search = document.getElementById('searchButton')
const songCard = document.getElementsByClassName('songCard')
const artwork = document.getElementById('artwork')
const title = document.getElementById('trackName')
const artist = document.getElementById('artistName')


// submit.addEventListener("click", function (event){
//     ///something here to make the result be part of the fetch?
//     console.log("search clicked")
//     //initiate whatever logic thing to replace spaces with plusses
//     return term
//     let term = searchBar.replaceAll(" ", "+")
// })



let url = "https://itunes.apple.com/search?term=nada+surf&entity=song"
//possible way to make the fetch url? `url${searchBar.text}&entity=song?
//also going to need a logic thing to replace the spaces with pluses
fetch(url, {
    method:"GET",
    headers: {"Content-Type": 'application/JSON'},
}).then(function (response){
    return response.json()
}) .then(function (data) {
    console.log(data.results);
    song(data.results)
})

function song(results) {
    for (let song of results){
    artwork.src = song.artworkUrl100;
    console.log("songCard.src");
    title.innerText = `${song.trackName}`;
    console.log(title.innerText);
    artist.innerText = `${song.artistName}`;
    console.log(artist.innerText);  
}}




// make sure you connect 
//make an event listener on 