import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import "./home.scss";

const Home = () => {

  const { handleGetsong } = useSong();

  return (
    <div className="home">

      {/* App Header */}
      <div className="home__header">
        <h1>Emotion Based Music Player 🎵</h1>
        <p>
          This application detects your facial expression using the camera.
          When you click the <b>Detect Expression</b> button, the system
          analyzes your face and identifies emotions like <b>happy</b>,
          <b>sad</b>, or <b>surprised</b>. Based on the detected emotion,
          the app calls the API and fetches a song from the database that
          matches your mood.
        </p>
      </div>

      {/* Main Content */}
      <div className="home__content">

        <FaceExpression
          onClick={(expression) => {
            handleGetsong({ mood: expression });
          }}
        />

        <Player />

      </div>

    </div>
  );
};

export default Home;