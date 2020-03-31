import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import VerseEditForm from "./VerseEditForm";
import AddComment from "../comment/AddComment";
import CommentCard from "../comment/CommentCard";

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
          arrow_back
        </span>
        <span className="material-icons"
          type="button"
          disabled={isLoading}
          onClick={onClickCommentHandler}
        >
          add_comment
        </span>
        <span type="button" className="material-icons" disabled={isLoading} onClick={onClickEditHandler}>
          edit
        </span>
        <span type="button" className="material-icons" disabled={isLoading} onClick={handleDelete}>
          delete
        </span>
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
    </div>
  );
};

export default VerseDetail;
