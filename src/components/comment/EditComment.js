import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";

const CommentEditForm = props => {
  const [comment, setComment] = useState({ editComment: "" });

  const handleFieldChange = evt => {
    const stateToChange = { ...comment };
    stateToChange[evt.target.id] = evt.target.value;
    setComment(stateToChange);
  };

  const updateComment = e => {
      e.preventDefault();
      const userId = sessionStorage.getItem("id");
      const commentId = props.match.params.commentId;
  }
};

export default CommentEditForm