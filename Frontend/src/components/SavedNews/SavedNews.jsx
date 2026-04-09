import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
// import cards from "../../utils/datosPrueba";

function SavedNews({ currentUser }) {
  return (
    <div>
      <SavedNewsHeader currentUser={currentUser} />
      <NewsCardList></NewsCardList>
    </div>
  );
}

export default SavedNews;
