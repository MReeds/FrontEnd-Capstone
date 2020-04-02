import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import EmotionManager from "../../modules/EmotionManager";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const VerseEditForm = props => {
  const [verse, setVerse] = useState({ editVerse: "" });
  const [emotions, setEmotions] = useState([]);

  const handleFieldChange = evt => {
    //   sets stateToChange equal to the verse object in state. Then targetting the id associated with the objects prop and setting it equal to the value. Then setting the verse objects state
    const stateToChange = { ...verse };
    stateToChange[evt.target.id] = evt.target.value;
    setVerse(stateToChange);
  };
  
  const GetEmotions = () => {
    return EmotionManager.getAll().then(emotionsFromAPI => {
    setEmotions(emotionsFromAPI);
  });
};

  const updateVerse = e => {
    e.preventDefault();

    const userId = sessionStorage.getItem("id");

    const editedVerse = {
      id: props.verseId,
      userId: parseInt(userId),
      emotion: verse.emotion,
      bookName: verse.bookName,
      chapter: verse.chapter,
      verseNumber: verse.verseNumber
    };

    VerseManager.update("verses", editedVerse).then(() => {
      props.GetVerse();
      props.onClickEditHandler();
    })
  };

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  useEffect(() => {
      VerseManager.get("verses", props.verseId).then(verse => {
          setVerse(verse);
          GetEmotions();
    });
  }, []);

  return (
    <>
      <form>
      <div className="formgrid">
          <select
          value={verse.emotion}
          id="emotion"
          onChange={handleFieldChange}>
            {emotions.map(emotion => {
              return (
                <option key={emotion.id} id={emotion.id}>
                  {emotion.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="formgrid">
          <label htmlFor="bookName">Book Name </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="bookName"
            value={verse.bookName || ""}
          />
        </div>
        <div className="formgrid">
          <label htmlFor="chapter">Chapter </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="chapter"
            value={verse.chapter || ""}
          />
        </div>
        <div className="formgrid">
          <label htmlFor="verseNumber">Verse Number </label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="verseNumber"
            value={verse.verseNumber || ""}
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
