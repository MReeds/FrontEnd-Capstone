import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const VerseForm = props => {
  // userId is set as equal to the id currently in session storage
  const userId = sessionStorage.getItem("id");

  const [verse, setVerse] = useState({
    userId: parseInt(userId),
    emotion: "",
    bookName: "",
    chapter: "",
    verseNumber: ""
  });

  const handleFieldChange = e => {
    //   Setting state each time a key stroke happens in the targetted id of a prop from verse
    const stateToChange = { ...verse };
    stateToChange[e.target.id] = e.target.value;
    setVerse(stateToChange);
  };

  const createNewVerse = e => {
    e.preventDefault();
    // if a user doesnt write anything for the book or chapter field they will get an alert. If they do then it will post that entry and get all of them
    if (
      verse.bookName === "" ||
      verse.chapter === "" ||
      verse.verseNumber === ""
    ) {
      window.alert("Please enter a book and a chapter to record");
    } else {
      VerseManager.post("verses", verse, "user").then(props.getVerses);
      //   Once manager posts new verse and gets the list again its resets the value of the text boxes to an empty string below
      e.target.bookName.value = "";
      e.target.chapter.value = "";
      e.target.verseNumber.value = "";
    }
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
    props.GetEmotions();
  }, []);

  return (
    <>
      <form onSubmit={createNewVerse}>
        <label htmlFor="emotion">Add a new Verse</label>
        <div className="formgrid">
          <FormControl>
          <Select 
          labelId="demo-simple-select-placeholder-label-label"
          id="emotion"
          onChange={handleFieldChange}
          displayEmpty
          className={classes.selectEmpty}>
              {props.emotions.map(emotion => {
                return (
                  <MenuItem key={emotion.id} id={emotion.id}>
                    {emotion.name}
                  </MenuItem>
                )
              })}
          </Select>
          </FormControl>
          {/* <select id="emotion" required onChange={handleFieldChange}>
            {props.emotions.map(emotion => {
              return (
                <option key={emotion.id} id={emotion.id}>
                  {emotion.name}
                </option>
              );
            })}
          </select> */}
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
          <button type="submit">Save Verse</button>
        </div>
      </form>
    </>
  );
};

export default VerseForm;
