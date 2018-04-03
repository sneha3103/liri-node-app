//dependency
require("dotenv").config();

var keys = require("./keys.js");
//whatever is in module.exports will show up in require 
var request = require("request"); //request is a package that we installed. Node knows its a package because it does not have ./

var fs = require ("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var omdbAPI = require("omdb-client");

//Created a user pick variable incase user selects a song or movie with multiple words.
var userPick = process.argv[2].slice().join(" ");

//Created a user command variable for the switch case statement to store what the user inputs - twitter, spotify, omdb, etc. 
var userCommand = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var secondCommand = process.argv[3];
console.log(userCommand);


switch (userCommand) {
    case "Twitter":
     displayTweet();
    break;

   

}

function displayTweet () {
    console.log("twitter test");
        var client = new Twitter({
             consumer_key: keys.twitter.consumer_key,
             consumer_secret: keys.twitter.consumer_secret,
             access_token_key: keys.twitter.access_token_key,
             access_token_secret: keys.twitter.access_token_secret
        });

        var params = {
             screen_name: "node.js",
        };

        client.get("statuses/user_timeline", params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
            };
        });


};


function displaySpotify (userPick) {

      var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
      });
       
      spotify.search({ type: "track", query: "All the Small Things" },          function(err, data) {
            if (err) {
            return console.log("Error occurred: " + err);
          }
       
            console.log(data); 

      });

}

//For the omdb function

function omdbMovie (userPick) {

    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
          console.log("Release Year: " + JSON.parse(body).Year);
        }

        console.log(response);
      });
}