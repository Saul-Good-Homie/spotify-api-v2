import "./ContentButton.css"
import React, { useEffect, useState } from "react";

const PlaylistButton = (data) => {
  // const [is_active, setActive] = useState(false);

  // const startPlaylist = () => {
  //   //console.log(data.id)
  //   console.log(data)
  //   data.play()
  // };

  // console.log("new button created")
  // console.log(data)

  // console.log(data)




    return (
    <>
      <button className="content-button" id={data.id} onClick={data.onClick}>{data.title}</button>
    </>
  );
};

export default PlaylistButton;