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
    const commentId = props.commentId;

    const editedComment = {
      id: commentId,
      userId: parseInt(userId),
      verseId: parseInt(props.match.params.verseId),
      comment: comment.comment
    };

    VerseManager.update("comments", editedComment).then(props.GetComments).then(() => {
        props.editCommentOnClick();
        props.history.push("/");
        props.history.push(`/verses/${editedComment.verseId}`)
    });
  };

  useEffect(() => {
    VerseManager.get("comments", props.commentId).then(comment => {
      setComment(comment);
    });
  }, []);

  return (
    <>
      <form>
        <div className="formgrid">
          <textarea
            type="text"
            onChange={handleFieldChange}
            id="comment"
            value={comment.comment}
          />
        </div>
        <div className="editBtn">
            <button
            type="button"
            onClick={updateComment}>
          Submit
            </button>
            </div>
      </form>
    </>
  );
};

export default CommentEditForm;
