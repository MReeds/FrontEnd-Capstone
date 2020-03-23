import React, { useState } from "react";
import VerseManager from "../../modules/VerseManager";
import CommentEditForm from "./EditComment";

const CommentCard = props => {
  const loginId = sessionStorage.getItem("id");

  const loginIdNum = parseInt(loginId);

  const commentId = props.comment.id;

  const isValid =
    loginIdNum === props.verse.userId &&
    props.comment.verseId === props.comment.verse.id;

  const [isEditComment, setIsEditComment] = useState(false);

  const editCommentOnClick = () => {
    setIsEditComment(!isEditComment);
  };

  const DeleteComments = () => {
    VerseManager.delete("comments", commentId).then(props.GetComments);
  };

  if (isValid) {
    return !isEditComment ? (
      <div className="commentCard">
        <div className="commentContent">
          <h4>
            <span className="cardTitle">{props.comment.comment}</span>
          </h4>
        </div>
        <button type="button" onClick={editCommentOnClick}>
          Edit
        </button>
        <button type="button" onClick={DeleteComments}>
          Delete
        </button>
      </div>
    ) : (
      <CommentEditForm
        GetComments={props.GetComments}
        commentId={commentId}
        editCommentOnClick={editCommentOnClick}
        {...props}
      />
    );
  } else {
    return null;
  }
};

export default CommentCard;
