import React from "react";
import hotel_mainpage from "../images/hotel_mainpage.png";

function LandingScreen() {
  return (
    <div
      style={{
        backgroundImage: `url(${hotel_mainpage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        width: "100%",
        height: "688px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="text-5xl text-center text-white"
    >
      Viotels, Making Hotel Booking Easy..
      <a href="/home">
        <button className="btn btn-primary bg-black">See Hotels</button>
      </a>
      <div
        style={{
          left: "0",
          bottom: "0",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        className="text-xl text-black"
      >
        CopyRights @ Shivanshu Panwar, All Rights Reserved
      </div>
    </div>
  );
}

export default LandingScreen;
