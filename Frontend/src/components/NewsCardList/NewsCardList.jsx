import NewsCard from "../NewsCard/NewsCard";
import { handleGetSavedArticles } from "../../utils/api/getArticles";
import { useEffect, useState } from "react";
import { handleDeleteArticles } from "../../utils/api/deleteArticles";

function NewsCardList({ savedArticles, onDelete }) {
  // const [savedArticles, setSavedArticles] = useState(null);

  // useEffect(() => {
  //   handleGetSavedArticles()
  //     .then((articles) => {
  //       setSavedArticles(articles);
  //     })
  //     .catch((err) => {
  //       console.error("Error al obtener artículos:", err);
  //     });
  // }, []);

  // function handleDelete(article_id) {
  //   handleDeleteArticles(article_id)
  //     .then(() => {
  //       setSavedArticles((prev) =>
  //         prev.filter((a) => a.article_id !== article_id),
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  return (
    <section className="card-list">
      <div className="card-list__container">
        {(savedArticles || []).map(
          (
            article, //Asi la aplicacion no truena ya que al menos siempre habra un array vacio.
          ) => (
            <NewsCard
              key={article.article_id}
              article={article}
              onDelete={onDelete}
            />
          ),
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
