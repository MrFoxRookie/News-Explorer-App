import Preloader from "../Preloader/Preloader";
import emptyImage from "../../images/results__empty-image.svg";
import errorImage from "../../images/results__error-image.svg";
import ArticlesCard from "../ArticlesCard/ArticlesCard";

function SearchResults({
  articles,
  isLoading,
  error,
  hasSearched,
  visibleCount,
  setVisibleCount,
  currentUser,
}) {
  const noResults =
    hasSearched && !isLoading && articles.length === 0 && !error;

  const results = hasSearched && !isLoading && articles.length >= 1 && !error;

  return (
    <div className="results">
      {isLoading && <Preloader />}

      {noResults && (
        <div className="results__empty">
          <img
            src={emptyImage}
            alt="Imagen de resultados inexistentes"
            className="results__empty-image"
          />
          <h2 className="results__empty-title">Nothing found</h2>
          <p className="results__empty-text">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      )}
      {!isLoading && error && (
        <div className="results__error">
          <img
            className="results__error-image"
            src={errorImage}
            alt="Imagen de error"
          />
          <h2 className="results__error-text">{error}</h2>
        </div>
      )}

      {!isLoading && articles.length > 0 && (
        <div className="results__articles-container">
          <h2 className="results__articles-title">Search results</h2>
          <div className="results__list">
            {articles.slice(0, visibleCount).map((article) => (
              <ArticlesCard
                key={article.url}
                article={article}
                currentUser={currentUser}
              />
            ))}
          </div>
          {visibleCount < articles.length && (
            <button
              className="results__articles-button"
              onClick={() => setVisibleCount(visibleCount + 3)}
            >
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
