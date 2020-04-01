import React, { useState, useEffect } from "react";
import VerseCard from "./VerseCard";
import VerseManager from "../../modules/VerseManager";
import EmotionManager from "../../modules/EmotionManager";
import VerseForm from "./VerseAddForm";
import StickyFooter from "../footer/Footer";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";


const AddButtonStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

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

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));
  const ButtonClasses = AddButtonStyles();
  const classes = useStyles();

  useEffect(() => {
    getVerses();
    GetEmotions();
  }, [emotion]);

  return (
    <>
      <div>
        <h3>How do you feel today?</h3>
        <FormControl>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={emotion || ""}
            onChange={(handleFieldChange, onSelectHandler)}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {emotions.map(emotion => {
              return (
                <MenuItem key={emotion.id} value={emotion.name}>
                  {emotion.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>Select your Mood</FormHelperText>
        </FormControl>
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
          <IconButton aria-label="AddCircle">
            <AddCircle />
          </IconButton>
        </span>
        {isAdd ? (
          <VerseForm
            getVerses={getVerses}
            GetEmotions={GetEmotions}
            emotions={emotions}
            {...props}
          />
        ) : null}
        {StickyFooter()}
      </div>
    </>
  );
};

export default VerseList;
