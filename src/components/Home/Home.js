import React, { useState, useEffect } from "react";
import VerseSpotlight from "../verse/VerseSpotlight";
import VerseManager from "../../modules/VerseManager";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import "./Home.css";

const Home = () => {
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
        <CardActions>
          <button className="material-icons" onClick={refreshVerseSpotlight}>
            refresh
          </button>
        </CardActions>
        <CardContent>
          {spotlightId && <VerseSpotlight verseId={spotlightId} />}
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
