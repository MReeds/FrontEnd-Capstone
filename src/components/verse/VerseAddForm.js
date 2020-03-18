import React, { useState } from "react";
import VerseManager from "../../modules/VerseManager";

// add a required emotion drop down selection to the add verse

const VerseForm = (props) => {
    // userId is set as equal to the id currently in session storage
    const userId = sessionStorage.getItem("id");
    const [verse, setVerse] = useState({ userId: parseInt(userId), emotion: "", bookName: "", chapter: "", verseNumber: "" });

    const handleFieldChange = e => {
        const stateToChange = { ...verse };
        stateToChange[e.target.id] = e.target.value;
        setVerse(stateToChange);
    };

    const createNewVerse = e => {
        e.preventDefault();
        // if a user doesnt write anything for the book or chapter field they will get an alert. If they do then it will post that entry and get all of them
        if (verse.bookName === "" || verse.chapter === "") {
            window.alert("Please enter a book and a chapter to record")
        } else {
            VerseManager.post(verse).then(props.getVerses);
        }
    };

    return (
        <>
        
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
                    <button
                    type="button"
                    onClick={createNewVerse}
                    >
                        Save Verse
                    </button>
                </div>
            
        </>
    )
}

export default VerseForm