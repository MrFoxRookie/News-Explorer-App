import cards from "../../utils/datosPrueba";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect } from "react";

function SavedNewsHeader() {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved-news">
      <p className="saved-news__header">Saved articles</p>
      <h1 className="saved-news__title">
        {currentUser.username}, you have {cards.length} saved articles
      </h1>
      <p className="saved-news__description">
        By keywords:{" "}
        <strong>
          {" "}
          {cards[0].keyword}, {cards[1].keyword}, and {cards.length - 2}{" "}
          other{" "}
        </strong>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
