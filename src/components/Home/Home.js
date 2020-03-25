import React, {useState, useEffect} from "react";
import VerseSpotlight from "../verse/VerseSpotlight";
import VerseManager from "../../modules/VerseManager";

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
      <button onClick={refreshVerseSpotlight}>New Verse &#x27f3;</button>
      {spotlightId && <VerseSpotlight verseId={spotlightId} />}
    </>
  );
};

export default Home;
