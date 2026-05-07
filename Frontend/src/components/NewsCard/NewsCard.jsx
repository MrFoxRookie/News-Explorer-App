function NewsCard({ article, onDelete }) {
  const {
    article_id,
    publishedAt,
    source,
    title,
    description,
    url,
    urlToImage,
    keyword,
  } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="news-card">
      {" "}
      <div className="news-card__image-container">
        {" "}
        <img src={urlToImage} alt="" className="news-card__image" />{" "}
        <button
          className="news-card__remove-button"
          onClick={() => onDelete(article_id)}
        ></button>{" "}
      </div>{" "}
      <div className="news-card__text-container">
        {" "}
        <p className="news-card__date">{formattedDate}</p>{" "}
        <h2 className="news-card__title">{title}</h2>{" "}
        <p className="news-card__text">{description}</p>{" "}
        <p className="news-card__source">{source.toUpperCase()}</p>{" "}
      </div>{" "}
    </div>
  );
}
export default NewsCard;
