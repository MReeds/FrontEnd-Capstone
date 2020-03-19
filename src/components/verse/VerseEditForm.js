import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const VerseEditForm = props => {
  const [verse, setVerse] = useState({ editVerse: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...verse };
    stateToChange[evt.target.id] = evt.target.value;
    setVerse(stateToChange);
  };

  const updateVerse = e => {
    const verseId = props.match.params.verseId;
    e.preventDefault();

    const editedVerse = {
      id: verseId,
      emotionId: verse.emotionId,
      bookName: verse.bookName,
      chapter: verse.chapter,
      verseNumber: verse.verseNumber
    };

    VerseManager.update("verses", editedVerse).then(
      VerseManager.get("verses", props.match.params.verseId).then(
        setVerse(verse)
      )
    );
    console.log(verse);
  };

  useEffect(() => {
    VerseManager.get("verses", props.match.params.verseId).then(verse => {
      setVerse(verse);
    });
  }, []);

  return (
    <>
      <form>
        <div className="formgrid">
          <label htmlFor="bookName">Book Name </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="bookName"
            value={verse.bookName}
          />
        </div>
        <div className="formgrid">
          <label htmlFor="chapter">Chapter </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="chapter"
            value={verse.chapter}
          />
        </div>
        <div className="formgrid">
          <label htmlFor="verseNumber">Verse Number </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="verseNumber"
            value={verse.verseNumber}
          />
        </div>
        <div className="editBtn">
          <button type="button" onClick={updateVerse}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default VerseEditForm;
