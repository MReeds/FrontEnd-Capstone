import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const AddComment = props => {
    const verseId = props.match.params.verseId

    const [comment, setComment] = useState({
        userId: parseInt(props.userId),
        verseId: parseInt(verseId),
        comment: ""
    });

    const handleFieldChange = e => {
        //   Setting state each time a key stroke happens in the targetted id of a prop from verse
    const stateToChange = { ...comment };
    stateToChange[e.target.id] = e.target.value;
    setComment(stateToChange);
  };

  const createNewComment = e => {
      debugger;
      e.preventDefault();
      VerseManager.post("comments", comment, "verse");
      e.target.comment.value = "";
  };

  return (
      <>
      <form onSubmit={createNewComment}>
          <label htmlFor="comment"></label>
          <div className="formgrid">
              <textarea
              type="text"
              onChange={handleFieldChange}
              id="comment"
              placeholder="Notate your thoughts"
              />
          </div>
          <div className="alignButton">
              <button type="submit">Add </button>
          </div>
      </form>
      </>
  )
}

export default AddComment;