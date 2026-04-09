import NewsCard from "../NewsCard/NewsCard";
import cards from "../../utils/datosPrueba";

function NewsCardList() {
  return (
    <section className="card-list">
      <div className="card-list__container">
        {cards.map((card) => (
          <NewsCard key={card._id} card={card} />
        ))}
      </div>
    </section>
  );
}

export default NewsCardList;
