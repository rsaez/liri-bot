//makes the .env variables available
require("dotenv").config();

//sets up the api keys to variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Sets the user input to variables
var command = process.argv[2];
var input = process.argv[3];

if(command === "my-tweets") {

} else if(command === "spotify-this-song"){

}else if(command === "movie-this"){

}else if(command === "do-what-it-says") {

} else {
        console.log("Invalid command");
}