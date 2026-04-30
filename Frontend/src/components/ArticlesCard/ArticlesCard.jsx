import { handleAddArticle } from "../../utils/api/addArticle";

function ArticlesCard({ article, currentUser }) {
  const { description, publishedAt, source, title, url, urlToImage } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = () => {
    handleAddArticle({
      description,
      publishedAt,
      source: source.name,
      title,
      url,
      urlToImage,
    })
      .then((data) => {
        if (!data.error) {
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="articles-card">
      <div className="articles-card__image-container">
        <img src={urlToImage} alt={title} className="articles-card__image" />
        <button
          onClick={handleSubmit}
          className={`articles-card__save-button ${
            currentUser ? "articles-card__save-button_active" : ""
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
