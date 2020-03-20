import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import VerseForm from "./VerseAddForm";
import VerseEditForm from "./VerseEditForm";

const VerseList = props => {
  const [verses, setVerses] = useState([]);

  const getVerses = () => {
    return VerseManager.getAll("verses").then(versesFromAPI => {
      setVerses(versesFromAPI);
    });
  };

  //   deletVerse is a prop of VerseList that is passed to Verse card. Its passed an id then uses a delete fetch call, gets all verses then sets them in state
  const deleteVerse = id => {
    debugger;
    VerseManager.deleteVerse(id).then(() =>
      VerseManager.getAll("verses").then(setVerses)
    );
  };

  useEffect(() => {
    getVerses();
  }, []);

  return (
    <>
      <section className="verseSectionContent">
        <div className="verseContainerCards">
          {verses.map(verse => (
            <VerseCard
              key={verse.id}
              verse={verse}
              deleteVerse={deleteVerse}
              {...props}
            />
          ))}
        </div>
      </section>
      <div>
      <VerseForm getVerses={getVerses} {...props}/>
      </div>
      {/* <div>
          <VerseEditForm getVerses={getVerses} {...props}/>
      </div> */}
    </>
  );
};

export default VerseList;
