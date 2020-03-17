import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import VerseForm from "./VerseAddForm";

const VerseList = props => {
  const [verses, setVerses] = useState([]);

  const getVerses = () => {
    return VerseManager.getAll().then(versesFromAPI => {
      setVerses(versesFromAPI);
    });
  };

  useEffect(() => {
    getVerses();
  }, []);

  return (
    <>
      <section className="verseSectionContent">
        <div className="verseContainerCards">
          {verses.map(verse => (
            <VerseCard key={verse.id} verse={verse} {...props} />
          ))}
        </div>
        <div className="newVerseButton">
          <button
            type="button"
            onClick={<VerseForm getVerses={getVerses} {...props} />}
          >New Verse
          </button>
        </div>
      </section>
    </>
  );
};

export default VerseList;
