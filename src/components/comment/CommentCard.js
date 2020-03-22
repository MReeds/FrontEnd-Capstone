import React from "react";

const CommentCard = props => {
  const loginId = sessionStorage.getItem("id");
  const loginIdNum = parseInt(loginId);

  return loginIdNum === props.verse.userId &&
    props.comment.verseId === props.comment.verse.id ? (
    <div className="commentCard">
      <div className="commentContent">
        <h4>
          <span className="cardTitle">{props.comment.comment}</span>
        </h4>
      </div>
    </div>
  ) : null;
};

export default CommentCard;
