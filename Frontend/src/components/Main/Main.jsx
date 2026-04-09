import About from "../About/About";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import SearchResults from "../SearchResults/SearchResults";

function Main({
  onSearch,
  articles,
  isLoading,
  error,
  hasSearched,
  visibleCount,
  setVisibleCount,
  currentUser,
}) {
  return (
    <div className="main">
      <h1 className="main__title">What's going on in the world?</h1>

      <p className="main__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>

      <SearchForm onSearch={onSearch} />
      {hasSearched && (
        <SearchResults
          articles={articles}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          currentUser={currentUser}
        ></SearchResults>
      )}
      <About />
    </div>
  );
}

export default Main;
