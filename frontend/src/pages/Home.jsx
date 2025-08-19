import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header-text">
        WELCOME TO PANKAJ LUTHRA
      </div>
      <img
        src="/banner.jpeg"
        alt="Banner"
        className="banner-img"
      />
    </div>
  );
};

export default Home;
