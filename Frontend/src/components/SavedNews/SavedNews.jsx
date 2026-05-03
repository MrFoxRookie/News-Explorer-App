import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import { useEffect, useState } from "react";
import { handleGetSavedArticles } from "../../utils/api/getArticles";
import { handleDeleteArticles } from "../../utils/api/deleteArticles";

function SavedNews() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    handleGetSavedArticles()
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.error("Error al obtener artículos:", err);
      });
  }, []);

  function handleDelete(article_id) {
    handleDeleteArticles(article_id)
      .then(() => {
        setSavedArticles((prev) =>
          prev.filter((a) => a.article_id !== article_id),
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div>
      <SavedNewsHeader savedArticles={savedArticles} />
      <NewsCardList
        savedArticles={savedArticles}
        onDelete={handleDelete}
      ></NewsCardList>
    </div>
  );
}

export default SavedNews;
