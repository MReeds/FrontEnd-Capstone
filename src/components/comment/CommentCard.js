import React from "react";
import VerseManager from "../../modules/VerseManager";

const CommentCard = props => {
  const loginId = sessionStorage.getItem("id");
  const loginIdNum = parseInt(loginId);
  const commentId = props.comment.id;

  const DeleteComments = () => {
    VerseManager.delete("comments", commentId).then(props.GetComments);
  };

  return loginIdNum === props.verse.userId &&
    props.comment.verseId === props.comment.verse.id ? (
    <div className="commentCard">
      <div className="commentContent">
        <h4>
          <span className="cardTitle">{props.comment.comment}</span>
        </h4>
      </div>
      <button type="button" onClick={DeleteComments}>
        Delete
      </button>
    </div>
  ) : null;
};

export default CommentCard;
