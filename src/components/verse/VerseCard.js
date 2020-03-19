import React from "react";

const VerseCard = props => {
  const loginId = sessionStorage.getItem("id");
  const loginIdNum = parseInt(loginId);

  return loginIdNum === props.verse.userId ? (
    <div className="verseCard">
      <div className="verseContent">
        <h3>
          <span
            className="cardTitle"
            onClick={() => props.history.push(`verses/${props.verse.id}`)}
          >
            {props.verse.bookName} {props.verse.chapter}:
            {props.verse.verseNumber}
          </span>
        </h3>
      </div>
    </div>
  ) : null;
};

export default VerseCard;
