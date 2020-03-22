import React, { useState, useEffect } from "react";
import VerseManager from "../../modules/VerseManager";
import VerseEditForm from "./VerseEditForm";
import AddComment from "../comment/addComment";

const VerseDetail = props => {
  const userId = sessionStorage.getItem("id");

  const [isLoading, setIsLoading] = useState(true);

  const [isEdit, setIsEdit] = useState(false);

  const [isComment, setIsComment] = useState(false);

  const onClickEditHandler = () => {
    setIsEdit(true);
  };

  const onClickCommentHandler = () => {
    setIsComment(true);
  }

  const [verse, setVerse] = useState({
    userId: parseInt(userId),
    emotion: "",
    bookName: "",
    chapter: "",
    verseNumber: ""
  });

  useEffect(() => {
    //   VerseManager get method is passed a resource and an id. So here im passing "verses" as the resource and using verseId thats passed down as a prop from Application Views
    VerseManager.get("verses", props.verseId).then(verse => {
      setVerse({
        userId: parseInt(userId),
        emotion: verse.emotion,
        bookName: verse.bookName,
        chapter: verse.chapter,
        verseNumber: verse.verseNumber
      });
      setIsLoading(false);
    });
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
          When I feel {verse.emotion}, I should read {verse.bookName} {verse.chapter}:{verse.verseNumber}
          </span>
        </h3>
        <button type="button"
        disabled={isLoading} onClick={onClickCommentHandler}>
          Comment
        </button>
        <button type="button" disabled={isLoading} onClick={onClickEditHandler}>
          Edit
        </button>
        <button type="button" disabled={isLoading} onClick={handleDelete}>
          Delete
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => props.history.push("/verses")}
        >
          Go Back
        </button>
        {isComment ? <AddComment {...props}/> : null}
        {isEdit ? <VerseEditForm {...props} /> : null}
      </div>
    </div>
  );
};

export default VerseDetail;
