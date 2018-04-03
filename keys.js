// Any code or data that we want to be required, we have to put in module.exports
console.log('this is loaded');

module.exports.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };
  
module.exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };


//automatically module.exports equals an empty object

car = {
    name: Honda,
    color: Blue,
}

car.wheels = 4
//this would add a property of wheels with a value of 4. 

