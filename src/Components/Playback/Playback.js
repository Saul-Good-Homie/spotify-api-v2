import React, { useEffect, useState } from "react";
import PlaybackContainer from "./PlaybackContainer";
var SpotifyWebApi = require('spotify-web-api-node');

const Playback = () => {
  const [user, setUser] = useState("");

  //create a new instance of spotify API
  var spotifyApi = new SpotifyWebApi({

    });

  //function to call the server and set the token
  async function getToken() {
    const response = await fetch('/auth/token');
    const json = await response.json();
    spotifyApi.setAccessToken(json.access_token);
  }
  //call the function and get the token
  getToken();

//  // Get the authenticated user

  const showCurrentPlayback = () => {
        // Get the authenticated user
          spotifyApi.getMe()
           .then(function(userData) {
              console.log('Some information about the authenticated user', userData.body);
              setUser(userData.body)
          }, function(err) {
              console.log('Something went wrong!', err);
          });

            // Get Information About The User's Current Playback State
                spotifyApi.getMyCurrentPlaybackState()
                    .then(function(data) {
                // Output items
                    if (data.body && data.body.is_playing) {
                    console.log("User is currently playing something!");
                    console.log(data.body)
                } else {
                console.log("User is not playing anything, or doing so in private.");
                }
            }, function(err) {
                console.log('Something went wrong!', err);
            });        }


  return (
    <div>
        <button onClick={showCurrentPlayback}>Playback</button>
        <PlaybackContainer/>

    </div>
     

  );
};

export default Playback;