import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect } from "react";

function SavedNewsHeader({ savedArticles }) {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);
  const count = savedArticles.length;

  return (
    <div className="saved-news">
      <p className="saved-news__header">Saved articles</p>
      <h1 className="saved-news__title">
        {currentUser.username}, you have {savedArticles.length} saved articles
      </h1>
      <p className="saved-news__description">
        By keywords:{" "}
        <strong>
          {savedArticles[0]?.keyword || ""}
          {savedArticles[1] ? `, ${savedArticles[1].keyword}` : ""}
          {count > 2 ? `, and ${count - 2} other` : ""}
        </strong>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
