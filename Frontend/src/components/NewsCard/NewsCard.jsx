function NewsCard({ card }) {
  const {
    article_id,
    publishedAt,
    source,
    title,
    description,
    url,
    urlToImage,
  } = card;

  const date = new Date(publishedAt).toLocaleDateString("es-Mx");

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt="" className="news-card__image" />
        <button className="news-card__remove-button"></button>
      </div>
      <div className="news-card__text-container">
        <p className="news-card__date">{date}</p>
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default NewsCard;
