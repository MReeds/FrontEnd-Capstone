import React from "react";

const VerseCard = props => {
    return (
        <div className="verseCard">
            <div className="verseContent">
    <h3>{props.verse.bookName} {props.verse.chapter}:{props.verse.verseNumber}</h3>
            </div>
        </div>
    )
}

export default VerseCard