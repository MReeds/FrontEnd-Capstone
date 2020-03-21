import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import EmotionManager from "../../modules/EmotionManager";
import VerseForm from "./VerseAddForm";

const VerseList = props => {
  const [verses, setVerses] = useState([]);
  const [emotions, setEmotions] = useState([]);

  const [isAdd, setIsAdd] = useState(false);

  const onClickHandler = () => {
    setIsAdd(true);
  };

  const GetEmotions = () => {
    return EmotionManager.getAll().then(emotionsFromAPI => {
      setEmotions(emotionsFromAPI);
    });
  };

  const getVerses = () => {
    return VerseManager.getAll("verses").then(versesFromAPI => {
      setVerses(versesFromAPI);
    });
  };

  const handleFieldChange = e => {
      debugger;
    //   Setting state each time a key stroke happens in the targetted id of a prop from verse
    const stateToChange = { ...verses };
    stateToChange[e.target.id] = e.target.value;
    setVerses(stateToChange);
  };

  useEffect(() => {
    getVerses();
    GetEmotions();
  }, []);

  return (
    <>
      <div>
        <select onChange={handleFieldChange}>
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
          {verses.map(verse => ( 
            <VerseCard key={verse.id} verse={verse} {...props} />
          ))}
        </div>
      </section>
      <div>
        <button type="button" onClick={onClickHandler}>
          Add Verse
        </button>
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
