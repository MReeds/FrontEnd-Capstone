import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import VerseEditForm from "./VerseEditForm";
import AddComment from "../comment/AddComment";
import CommentCard from "../comment/CommentCard";
import StickyFooter from "../footer/Footer";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CommentIcon from "@material-ui/icons/Comment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));


const VerseDetail = props => {
  const userId = sessionStorage.getItem("id");

  const [isLoading, setIsLoading] = useState(true);
  
  const [isEdit, setIsEdit] = useState(false);

  const [isEditComment, setIsEditComment] = useState(false);
  
  const [isComment, setIsComment] = useState(false);
  
  const [comments, setComments] = useState([]);

  const onClickEditHandler = () => {
    setIsEdit(!isEdit);
  };

  const onClickCommentHandler = () => {
    setIsComment(!isComment);
  };
  
  const editCommentOnClick = () => {
    setIsEditComment(true);
  };

  const GetComments = () => {
    return VerseManager.getWithComments("comments").then(AllComments => {
      setComments(AllComments);
    });
  };
  
  const GetVerse = () => {
    VerseManager.get("verses", props.verseId).then(verse => {
      setVerse({
        userId: parseInt(userId),
        emotion: verse.emotion,
        bookName: verse.bookName,
        chapter: verse.chapter,
        verseNumber: verse.verseNumber
      });
    });
  };
  
  const [verse, setVerse] = useState({
    userId: parseInt(userId),
    emotion: "",
    bookName: "",
    chapter: "",
    verseNumber: ""
  });
  
  useEffect(() => {
    //   VerseManager get method is passed a resource and an id. So here im passing "verses" as the resource and using verseId thats passed down as a prop from Application Views
    GetVerse();
    GetComments();
    setIsLoading(false);
  }, [props.verseId, userId]);
  
  const handleDelete = () => {
    //   HandleDelete is passed a resource and an id similar to get and we pass in the same arguments
    setIsLoading(true);
    VerseManager.delete("verses", props.verseId).then(() => {
      props.history.push("/verses");
    });
  };
  
  const classes = useStyles();

  return (
    <div className="card">
      <div className="cardContent">
        <h3>
          <span>
            When I feel {verse.emotion}, I should read {verse.bookName}{" "}
            {verse.chapter}:{verse.verseNumber}
          </span>
        </h3>
        <span
          type="button"
          className="material-icons"
          disabled={isLoading}
          onClick={() => props.history.push("/verses")}
        >
          <IconButton aria-label="arrowBack">
            <ArrowBackIcon />
          </IconButton>
        </span>
        <span
          type="button"
          disabled={isLoading}
          onClick={onClickCommentHandler}
        >
          <IconButton aria-label="comment">
            <CommentIcon />
          </IconButton>
        </span>
        <span
          type="button"
          disabled={isLoading}
          onClick={onClickEditHandler}
        >
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </span>
        <span
          type="button"
          disabled={isLoading}
          onClick={handleDelete}
        >
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </span>
        <div className={classes.root}>
        </div>
        {isEdit ? (
          <VerseEditForm
            verseId={props.verseId}
            onClickEditHandler={onClickEditHandler}
            GetVerse={GetVerse}
            verse={verse}
            {...props}
          />
        ) : null}
        <div className="commentContainerCards">
          <h4>
            {comments.map(comment => {
              return comment.verseId === props.verseId ? (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  GetComments={GetComments}
                  editCommentOnClick={editCommentOnClick}
                  verseId={props.verseId}
                  verse={verse}
                  {...props}
                />
              ) : null;
            })}
          </h4>
        </div>
        {isComment ? (
          <AddComment
            userId={userId}
            GetComments={GetComments}
            verse={verse}
            {...props}
          />
        ) : null}
      </div>
      {StickyFooter()}
    </div>
  );
};

export default VerseDetail;
