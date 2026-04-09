function ArticlesCard({ article, currentUser }) {
  const { source, title, publishedAt, description, urlToImage } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="articles-card">
      <div className="articles-card__image-container">
        <img src={urlToImage} alt={title} className="articles-card__image" />
        <button
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
