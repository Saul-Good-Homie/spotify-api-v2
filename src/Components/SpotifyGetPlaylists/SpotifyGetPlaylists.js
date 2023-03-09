import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistButton from "../ContentButtons/PlaylistButton";
const dotenv = require('dotenv');
var SpotifyWebApi = require('spotify-web-api-node');

const SpotifyGetPlaylists = () => {
  const [user, setUser] = useState("");
  const [playlists, setPlaylists] = useState([])

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

  


  const handleGetPlaylists = () => {
        // Get the authenticated user
          spotifyApi.getMe()
           .then(function(userData) {
              console.log('Some information about the authenticated user', userData.body);
              setUser(userData.body)
          }, function(err) {
              console.log('Something went wrong!', err);
          });

          console.log('usestate user=', user)

          // Get a user's playlists
          spotifyApi.getUserPlaylists(user.display_name)
            .then(function(playlistData) {
              console.log('Retrieved playlists', playlistData.body);
              setPlaylists(playlistData.body)
            },function(err) {
              console.log('Something went wrong!', err);
            });
        }


  return (
    <>
      <button onClick={handleGetPlaylists}>Get Playlists</button>
      {playlists?.items ? playlists.items.map((item) => <PlaylistButton title={item.name} id={item.id} key={item.id} ></PlaylistButton>) : null}
    </>
  );
};

export default SpotifyGetPlaylists;