import NewsCard from "../NewsCard/NewsCard";
// import cards from "../../utils/datosPrueba";

import { handleGetSavedArticles } from "../../utils/api/getArticles";
import { useEffect, useState } from "react";

function NewsCardList() {
  const [savedArticles, setSavedArticles] = useState(null);

  useEffect(() => {
    handleGetSavedArticles()
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.error("Error al obtener artículos:", err);
      });
  }, []);

  return (
    <section className="card-list">
      <div className="card-list__container">
        {(savedArticles || []).map(
          (
            card, //Asi la aplicacion no truena ya que al menos siempre habra un array vacio.
          ) => (
            <NewsCard key={card.article_id} card={card} />
          ),
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
