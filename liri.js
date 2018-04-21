//makes the .env variables available
require("dotenv").config();
var keys = require("./keys.js");
var spotifyNode = require("node-spotify-api");
var twitter = require("twitter");
var omdbNode = require("omdb");
var request = require("request");
var fs = require("fs");

//sets up the api keys to variables
var spotify = new spotifyNode(keys.spotify);
var client = new twitter(keys.twitter);
var omdb = new omdbNode(keys.omdb);

//Sets the user input to variables
var command = process.argv[2];
var input = process.argv[3];

//Uses twitter API to get last 20 tweets
function myTweets() {
    var user_id = "johnnyBgood1985";
    var count = "20";

    //Example API call
    //GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2


    client.get("statuses/user_timeline", { user_id: "johnnyBgood1985", count: "20" },  function (error, tweets, response) {
        if (error) {
            return console.log(error)
        }

        for(var i = 0; i < tweets.length; i++) {
            console.log("===============================");
            console.log(tweets[i]);
            console.log();
        })
    });

}

//Uses Spotify API to return song info
function mySpotify() {

    if(input === null) {
        spotify.search({ type: 'track,artist', query: "The Sign,ace of base", limit: "1" }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            // Do something with 'data'
            for(var i = 0; i < data.length; i++){
                //choose the ace of base element

                // print the Artist(s), song's name, preview link, and the album
            }


        });
    } else {
        spotify.search({ type: 'track', query: input, limit: "1" }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            // Do something with 'data'
            //create a for loop and print the Artist(s), song's name, preview link, and the album for all of the results
        });
    }

}

//Uses OMDB API to return movie info
function myOMDB() {
    //http://www.omdbapi.com/?i=tt3896198&apikey=53c88e58

    if(input === null) {
        input = "Mr Nobody";
    }

    var title = input;
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=" + omdb.key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.Title);
        console.log(response.Year);
        console.log(response.Ratings[0].Value);
        console.log(response.Ratings[1].Value);
        console.log(response.Country);
        console.log(response.Plot);
        console.log(response.Actors);
    });



}

//Uses fs to read from random.txt file and run one of the commands
function myDoWhatItSays() {
    fs.readFile('random.txt', "utf8", function(err, data) {
        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }
        // If no error is experienced.
        var textValues = data.split(",");
        command = textValues[0];
        input = textValues[1];
        conditionals();

    });

}

function conditionals() {
    //Conditionals to conduct user's command
    if (command === "my-tweets") {
        myTweets();

    } else if (command === "spotify-this-song") {
        mySpotify();

    } else if (command === "movie-this") {
        myOMDB();

    } else if (command === "do-what-it-says") {
        myDoWhatItSays();

    } else {
        console.log("Invalid Command");
    }
}

conditionals();