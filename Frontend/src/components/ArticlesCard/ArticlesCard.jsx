import { useState, useEffect } from "react";

import { handleAddArticle } from "../../utils/api/addArticle";
import { handleGetSavedArticles } from "../../utils/api/getArticles";
import { handleDeleteArticles } from "../../utils/api/deleteArticles";

function ArticlesCard({ article }) {
  const { description, publishedAt, source, title, url, urlToImage, keyword } =
    article;

  const [isSaved, setIsSaved] = useState(false);
  const [savedArticle, setSavedArticle] = useState(null);

  useEffect(() => {
    handleGetSavedArticles()
      .then((articles) => {
        const found = articles.find((a) => a.url === url);

        if (found) {
          setIsSaved(true);
          setSavedArticle(found.article_id);
        } else {
          setIsSaved(false);
          setSavedArticle(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = () => {
    if (!isSaved) {
      handleAddArticle({
        description,
        publishedAt,
        source: source.name,
        title,
        url,
        urlToImage,
        keyword,
      })
        .then((data) => {
          setSavedArticle(data.article_id);
          setIsSaved(true);
        })
        .catch((err) => {
          console.log("que pedo");
          console.log(err.message);
        });
    } else {
      if (!savedArticle) return;
      handleDeleteArticles(savedArticle)
        .then((data) => {
          setIsSaved(false);
          setSavedArticle(null);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="articles-card">
      <div className="articles-card__image-container">
        <img src={urlToImage} alt={title} className="articles-card__image" />
        <button
          onClick={handleSubmit}
          className={`articles-card__save-button ${
            isSaved ? "articles-card__save-button_active" : ""
          }`}
        ></button>
      </div>

      <div className="articles-card__text-container">
        <p className="articles-card__date">{formattedDate}</p>
        <h3 className="articles-card__title">{title}</h3>
        <p className="articles-card__text">{description}</p>
        <p className="articles-card__source">{source?.name?.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default ArticlesCard;
