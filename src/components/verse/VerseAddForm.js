import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import EmotionManager from "../../modules/EmotionManager";

// add a required emotion drop down selection to the add verse

const VerseForm = props => {
  // userId is set as equal to the id currently in session storage
  const userId = sessionStorage.getItem("id");

  const [emotions, setEmotions] = useState([]);

  const [verse, setVerse] = useState({
    userId: parseInt(userId),
    emotionId: emotions.id,
    bookName: "",
    chapter: "",
    verseNumber: ""
  });

  const GetEmotions = () => {
    return EmotionManager.getAll().then(emotionsFromAPI => {
      setEmotions(emotionsFromAPI);
      console.log(emotionsFromAPI)
    });
  };

  //   const [emotions] = useState([
  //     { label: "Peaceful", value: 1 },
  //     { label: "Thankful", value: 2 },
  //     { label: "Angry", value: 3 },
  //     { label: "Jealous", value: 4 },
  //     { label: "Depressed", value: 5 },
  //     { label: "Hurt", value: 6 },
  //     { label: "Anxious", value: 7 },
  //     { label: "Stressed", value: 8 }
  //   ]);

  const handleFieldChange = e => {
    const stateToChange = { ...verse };
    stateToChange[e.target.id] = e.target.value;
    setVerse(stateToChange);
  };

  const createNewVerse = e => {
    e.preventDefault();
    // if a user doesnt write anything for the book or chapter field they will get an alert. If they do then it will post that entry and get all of them
    if (verse.bookName === "" || verse.chapter === "") {
      window.alert("Please enter a book and a chapter to record");
    } else {
      VerseManager.post(verse).then(props.getVerses);
    }
  };

  useEffect(() => {
    GetEmotions();
  }, []);

  return (
    <>
      <label htmlFor="emotion">How do you feel? </label>
      <div className="formgrid">
        <select>
            {emotions.map(emotion => {
               return <option key={emotion.id} id={emotion.id}>{emotion.name}</option>;
            })}
        </select>
      </div>
      <label htmlFor="book">Book </label>
      <div className="formgrid">
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="bookName"
          placeholder="Matthew, Mark, Luke"
        />
      </div>
      <label htmlFor="chapter">Chapter </label>
      <div className="formgrid">
        <input
          type="text"
          required
          onChange={handleFieldChange}
          id="chapter"
          placeholder="3, 15, 23"
        />
      </div>
      <label htmlFor="verseNumber">Verse </label>
      <div className="formgrid">
        <input
          type="text"
          onChange={handleFieldChange}
          id="verseNumber"
          placeholder="1-4"
        />
      </div>
      <div className="alignButton">
        <button type="button" onClick={createNewVerse}>
          Save Verse
        </button>
      </div>
    </>
  );
};

export default VerseForm;
