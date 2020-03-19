import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const VerseDetail = props => {
  const userId = sessionStorage.getItem("id");

  const [isLoading, setIsLoading] = useState(true);
  const [verse, setVerse] = useState({
    userId: parseInt(userId),
    emotionId: "",
    bookName: "",
    chapter: "",
    verseNumber: ""
  });

  useEffect(() => {
    VerseManager.get("verses", props.verseId).then(verse => {
      setVerse({
        userId: parseInt(userId),
        emotionId: verse.emotionId,
        bookName: verse.bookName,
        chapter: verse.chapter,
        verseNumber: verse.verseNumber
      });
      setIsLoading(false);
    });
  }, [props.verseId, userId]);

  const handleDelete = () => {
    setIsLoading(true);
    VerseManager.delete("verses", props.verseId).then(() => {
      props.history.push("/verses");
    });
  };

  return (
    <div className="card">
      <div className="cardContent">
        <h3>
          <span>
            {verse.bookName} {verse.chapter}:{verse.verseNumber}
          </span>
        </h3>
        <button type="button" disabled={isLoading} onClick={handleDelete}>
          Delete
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => props.history.push("/verses")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default VerseDetail