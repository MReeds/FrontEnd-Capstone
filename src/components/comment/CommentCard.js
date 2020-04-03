import React, { useState } from "react";
import VerseManager from "../../modules/VerseManager";
import CommentEditForm from "./EditComment";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const CommentCard = props => {
  const loginId = sessionStorage.getItem("id");

  const loginIdNum = parseInt(loginId);

  const commentId = props.comment.id;

  const isValid =
    loginIdNum === props.verse.userId &&
    props.comment.verseId === props.comment.verse.id;

  const [isEditComment, setIsEditComment] = useState(false);

const classes = useStyles();

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
            <span className="commentTitle">{props.comment.comment}</span>
          </h4>
        </div>
        <span type="button" onClick={editCommentOnClick}>
        <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </span>
        <span type="button" onClick={DeleteComments}>
        <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </span>
        <div className={classes.root}>
        </div>
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
