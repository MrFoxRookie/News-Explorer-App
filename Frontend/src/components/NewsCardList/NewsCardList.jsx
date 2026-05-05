import NewsCard from "../NewsCard/NewsCard";
import { handleGetSavedArticles } from "../../utils/api/getArticles";
import { useEffect, useState } from "react";
import { handleDeleteArticles } from "../../utils/api/deleteArticles";

function NewsCardList({ savedArticles, onDelete }) {
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
