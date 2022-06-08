const search = document.getElementById("searchButton");
let resultBox = document.querySelector(".resultBox");
const form = document.querySelector("#myForm");
const inputField = document.querySelector("#searchBar");
const player = document.querySelector("#audioPlayer");
const now = document.querySelector("#now")
//1-6 declare variables that javascript needs to pay attention to in the html - like placing marks on the stage we're going to use later 

form.addEventListener("submit", function (event) {
    //listen for "submit" to happen in the form I made in html - in forms "submit" handles submission by click and by enter (and any other accessibility tools used)
    // when submit happens, do this function 
  resultBox.innerHTML = "";
  //take any children out of the resultBox, aka remove previous search results
  event.preventDefault();
  //stops the browser from reloading automatically (default behavior is for the page to reload, which we don't want because the results will go away). the search results will stay there until we tell them to go away (which happens in the line above, so the resulsts stay until the next time submit is clicked)
  getResults(inputField.value);
  //calls getResults function (defined further down) on whatever was put in the form's input field, aka our search bar
  console.log(inputField.value);
});

function getResults(term) {
    //creates a function called 'getResults' that will take 1 parameter, which we're calling 'term'
  let url = `https://itunes.apple.com/search?term=${term.replaceAll(" ", "+")}&entity=song`;
  //replaces all spaces found in the 'term' (what we're putting into the funciton) with +
  //also makes a variable called 'url' that has our modified search term as part of it, which we'll use in our fetch request below 
  console.log(url);
  fetch(url, {
      //use our customized url in our fetch request to the API
    method: "GET",
    //we're asking to get information from the API, the Read part of crud 
    headers: { "Content-Type": "application/JSON" },
  })
    .then(function (response) {
        //when the response from the API comes back, do this function
      return response.json();
      //turn the response into json format so we can use it as data in the next line 
    })
    .then(function (data) {
      console.log(data.results);
      //in this case, our data is a string and then an array of songs, which is called "results". we just want to use the objects in the array, so we're specifically asking to console.log the array
      song(data.results);
      //call the function 'song' on the result array. song is defined below
      if (data.results.length === 0) {
          //if the array is empy, do the following
          console.log('no results found')
          let noResults = document.createElement('div')
          //make a new div
          noResults.classList.add("noResults")
          //add the class 'noResults' to the new div made in the line above
          noResults.innerText = `No results found`
          //the innerText is the part of this div that shows up on the page
          resultBox.appendChild(noResults)
          //add this new div to the page as a child of resultBox - so this will be visible in the results section of the page
      }
    })
    .catch(err => {
        //look out for any errors, and if there is one, show it in the console and make an alert for the user
        console.error(err)
        alert('Uh oh! Something went wrong: ' + err)
    })
    
}
function song(results) {
    //make a function called 'song' which takes one parameter, which we're calling 'results' (we know we're going to pass it an array)
  for (let song of results) {
      //makes a for loop that will do the following function on each of the objects in the array. we've called the object 'song' and the array 'results'
    resultBox.appendChild(addSong(song));
    //call the function addSong on each object 'song', then append whatever came out of the function to resultBox
  }
}

function addSong(song) {
  let songCard = document.createElement("div");
  songCard.classList.add("songCard");
  //make a new div called 'songCard', add the class "songCard" to it

  let artwork = document.createElement("img");
  //create a new img in the html
  artwork.classList.add("artwork")
  //add class 'artwork'
  artwork.src = song.artworkUrl100;
  //set the src of this img element as the value of the artworkUrl100 key 
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

  return songCard;
}

resultBox.addEventListener("click", function(event) {
    //listen for an event anywhere in the resultBox
    let target = event.target;
    //make the variable target be whatever was clicked (event.target is the specific place on the page where the event occurred, in this case our event is a click)
    console.log(target)
    console.log(target.parentElement)
    if (target.parentElement.classList.contains("songCard")) {
        //look at the parent of the target's classList. if it contains "songCard", do the following. 
        //aka did the user click on something on the song card? in this case, I have the album art, song title, and artist name 
        console.log(target.parentElement.children)
        player.src = target.parentElement.children[2].innerText
        //give the player a src attribute that is the innertext of the 3rd child of the parent
        //aka take the innertext of the 3rd div inside of songCard. In the function addSong  you can see that I appended multiple children to the songCard. The third one (array spot 2) is the audio source and I've given it the innerText of the previewUrl (which is the preview audio for the song in the iTunes API) . So now we're going to take that previewUrl and add it to the player. This means that when the user presses play on the page, the song plays
        now.innerText = `Now Playing: ${target.parentElement.children[1].innerText} by ${target.parentElement.children[3].innerText}` 
        //make the innerText now show the title and artist so the user has confirmation of which song they're listening to.
        console.log("now playing updated")
    } else if (target.classList.contains("songCard")) {
        //does the same thing, but if the user has clicked on the whitespace in the songCard element. Now, the user can click anywhere inside the border of the songCard and they'll get the right audio. (because they're either clicking on the songCard div, or on a child of the songCard div, and we've told javascript what to do in either scenario) Note: we can use the target's children and we don't have to deal with parent element stuff
        console.log("target.classList")
        player.src = target.children[2].innerText
        now.innerText = `Now Playing: ${target.children[1].innerText} by ${target.children[3].innerText}` 
        console.log("now playing updated")
    }
}) 



//~~~fix formatting so the long song titles don't mess stuff up 