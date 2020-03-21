import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import VerseForm from "./VerseAddForm";

const VerseList = props => {
  const [verses, setVerses] = useState([]);

  const [isAdd, setIsAdd] = useState(false);

  const onClickHandler = () => {
    setIsAdd(true);
  };

  const getVerses = () => {
    return VerseManager.getAll("verses").then(versesFromAPI => {
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
            <VerseCard
              key={verse.id}
              verse={verse}
              {...props}
            />
          ))}
        </div>
      </section>
      <div>
        <button type="button" onClick={onClickHandler}>
          Add Verse
        </button>
        {isAdd ? <VerseForm getVerses={getVerses} {...props} /> : null}
      </div>
    </>
  );
};

export default VerseList;
