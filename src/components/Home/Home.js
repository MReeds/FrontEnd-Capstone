import React, { useState, useEffect } from "react";
import VerseSpotlight from "../verse/VerseSpotlight";
import VerseManager from "../../modules/VerseManager";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "./Home.css";

const Home = () => {
  const loginInfo = sessionStorage.getItem("credentials").slice(12);
  const username = loginInfo.split(`"`);
  const justUsername = username[1];
  const upperCaseUsername = justUsername.charAt(0).toUpperCase() + justUsername.slice(1)
  
  const [spotlightId, setSpotlightId] = useState(0);

  const refreshVerseSpotlight = () => {
    VerseManager.getRandomId("verses").then(setSpotlightId);
  };

  useEffect(() => {
    refreshVerseSpotlight();
  }, []);
  return (
    <>
      <Card className="spotlight">
        <CardContent className="spotlightContent">
          <h2>
  Hello, {upperCaseUsername}! Your random verse for the day is
            {spotlightId && <VerseSpotlight verseId={spotlightId} />}
          </h2>
        </CardContent>
        <CardActions className="spotlightBtn">
          <button className="material-icons" onClick={refreshVerseSpotlight}>
            refresh
          </button>
        </CardActions>
      </Card>
    </>
  );
};

export default Home;
