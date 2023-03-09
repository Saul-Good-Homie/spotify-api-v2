import React, { useEffect, useState } from "react";
import axios from "axios";
import PodcastButton from "../ContentButtons/PodcastsButton";
const PODCASTS_ENDPOINT = "https://api.spotify.com/v1/me/episodes";

const SpotifyGetPodcasts = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken")) {
  //     setToken(localStorage.getItem("accessToken"));
  //   }
  // }, []);

    //use effect to get token from server
    useEffect(() => {

      async function getToken() {
        const response = await fetch('/auth/token');
        const json = await response.json();
        setToken(json.access_token);
      }
  
      getToken();
    }, []);

  const handleGetPodcasts = () => {
    axios
      .get(PODCASTS_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleGetPodcasts}>Get Podcasts</button>
      {data?.items ? data.items.map((item) => <PodcastButton>{item.episode.name}</PodcastButton>) : null}
    </>
  );
};

export default SpotifyGetPodcasts;