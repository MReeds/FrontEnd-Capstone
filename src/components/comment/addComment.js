import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const AddComment = () => {
    const userId = sessionStorage.getItem("id");

    const [comment, setComment] = useState({
        userId: parseInt(userId),
        comment: ""
    });

    const handleFieldChange = e => {
        //   Setting state each time a key stroke happens in the targetted id of a prop from verse
    const stateToChange = { ...comment };
    stateToChange[e.target.id] = e.target.value;
    setComment(stateToChange);
  };

  const createNewComment = e => {
      e.preventDefault();
      VerseManager.post("comments", comment);
      e.target.comment.value = "";
  };

  return (
      <>
      <form onSubmit={createNewComment}>
          <label htmlFor="comment"></label>
          <div className="formgrid">
              <input
              type="textarea"
              onChange={handleFieldChange}
              id="comment"
              placeholder="Notate your thoughts"
              />
          </div>
      </form>
      </>
  )
}

export default AddComment;