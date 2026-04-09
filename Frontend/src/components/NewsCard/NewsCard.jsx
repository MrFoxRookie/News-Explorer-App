function NewsCard({ card }) {
  const { title, text, date, source, link, image, keyword } = card;

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={image} alt="" className="news-card__image" />
        <p className="news-card__category">{keyword}</p>
        <button className="news-card__remove-button"></button>
      </div>
      <div className="news-card__text-container">
        <p className="news-card__date">{date}</p>
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default NewsCard;
