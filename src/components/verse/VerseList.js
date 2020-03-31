import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import EmotionManager from "../../modules/EmotionManager";
import VerseForm from "./VerseAddForm";

const VerseList = props => {
  const [verses, setVerses] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [emotion, setEmotion] = useState("");
  let [select, setSelect] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const onClickHandler = () => {
    setIsAdd(!isAdd);
  };

  const onSelectHandler = e => {
    setSelect(true);
    setEmotion(e.target.value);
  };

  const GetEmotions = () => {
    return EmotionManager.getAll().then(emotionsFromAPI => {
      setEmotions(emotionsFromAPI);
    });
  };

  const getVerses = () => {
    return VerseManager.getAll("verses").then(allVerses => {
      const myEmotion = allVerses.filter(verse => emotion === verse.emotion);
      setVerses(myEmotion);
    });
  };

  const handleFieldChange = e => {
    //   Setting state each time a key stroke happens in the targetted id of a prop from verse
    const stateToChange = { ...verses };
    stateToChange[e.target.id] = e.target.value;
    setVerses(stateToChange);
  };

  useEffect(() => {
    getVerses();
    GetEmotions();
  }, [emotion]);

  return (
    <>
      <h3>How do you feel today?</h3>
      <div>
        <select
          onChange={(handleFieldChange, onSelectHandler)}
        >
          <option value="">Select your mood</option>
          {emotions.map(emotion => {
            return (
              <option key={emotion.id} id={emotion.id}>
                {emotion.name}
              </option>
            );
          })}
        </select>
      </div>
      <section className="verseSectionContent">
        <div className="verseContainerCards">
          {verses.map(verse =>
            select ? (
              <VerseCard key={verse.id} verse={verse} {...props} />
            ) : null
          )}
        </div>
      </section>
      <div>
        <span type="button" className="material-icons" onClick={onClickHandler}>
          add_circle
        </span>
        {isAdd ? (
          <VerseForm
            getVerses={getVerses}
            GetEmotions={GetEmotions}
            emotions={emotions}
            {...props}
          />
        ) : null}
      </div>
    </>
  );
};

export default VerseList;
