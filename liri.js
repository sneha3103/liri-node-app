require("dotenv").config();

// Used to access keys in keys.js local file
var keys = require("./keys.js");

//whatever is in module.exports will show up in require 
//request is a package that we installed. Node knows its a package because it does not have ./
var request = require("request");

//NPM module used to read random.txt file
var fs = require ("fs");

//NPM modules used to access Twitter and Spotify API

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

//Created a user command variable for the switch case statement to store what the user inputs - twitter, spotify, omdb, etc. 
var userCommand = process.argv[2];

//Created a user pick variable incase user selects a song or movie with multiple words.
var userPick = process.argv[3]



// var spotify = new Spotify(keys.spotify);


switch (userCommand) {
    case "my-tweets":
     displayTweet();
    break;

    case "spotify-this-song":
     displaySpotify();
    break;
 
    case "movie-this":
     omdbMovie();
     console.log("hello");
    break;

    case "do-what-it-says":
     doWhatItSays();
    break;

};

function displayTweet () {
        var client = new Twitter({
             consumer_key: keys.twitter.consumer_key,
             consumer_secret: keys.twitter.consumer_secret,
             access_token_key: keys.twitter.access_token_key,
             access_token_secret: keys.twitter.access_token_secret
        });

        var params = {
             screen_name: "SnehaDama",
             count: 10,
        };

        client.get("statuses/user_timeline", params, function (error, tweets, response) {
            if (!error) {
                console.log("Look at my latest tweets:");

                for (i=0; i < 10; i++) {
                    console.log(tweets[i].text);
                }
            } else {
                console.log(error);
            }
        });
};


function displaySpotify (userPick) {
    var spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret,
        
        });

      console.log("hello");
       
      spotify.search({ 
          type: "track", 
          query: userPick, 
        },    
        
          function(err, data) {
            if (err) {
            return console.log("There is an error: " + err);
          }

          for (i=0 ; i<data.tracks.items.length; i++){
              console.log(data.tracks.items[0]);
              return console.log("for loop happened");
          }
       
      });

}

//For the omdb function

function omdbMovie (userPick) {

    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
          console.log("Release Year: " + JSON.parse(body).Year);
        };

        // console.log(response);
      });


      //If the user does not enter a movie choice, make user pick equals to Mr.Nobody. 
      if(!userPick) {
          userPick = "Mr. Nobody";
      }
};


function doWhatItSays () {
    fs.readFile("random.txt" , "UTF8" , function(error,data) {

    
        var dataArr = data.split(",");
        var command = dataArr[0];
        var choice = dataArr[1];

        if (command === "movie-this") {
            userPick = choice;
            omdbMovie();
        } else if (command === "spotify-this-song") {
            userPick = choice;
            displaySpotify();
        } else if (command === "my-tweets") {
            displayTweet();

        }
    });
};