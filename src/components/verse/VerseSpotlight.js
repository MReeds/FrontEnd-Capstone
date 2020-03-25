import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const VerseSpotlight = props => {
  const loginId = sessionStorage.getItem("id");

  const loginIdNum = parseInt(loginId);

  const [verse, setVerse] = useState({
    userId: "",
    bookName: "",
    chapter: "",
    verseNumber: ""
  });

  useEffect(() => {
    VerseManager.get("verses", props.verseId).then(verse => {
      setVerse({
        userId: parseInt(verse.userId),
        bookName: verse.bookName,
        chapter: verse.chapter,
        verseNumber: verse.verseNumber
      });
    });
  }, [props.verseId]);

  return loginIdNum === verse.userId ? (
    <div className="verseSpotlight">
      <h2>{verse.bookName}</h2>
      <h2>
        {verse.chapter}:{verse.verseNumber}
      </h2>
    </div>
  ) : (
    " Click for a new verse!"
  );
};

export default VerseSpotlight;
