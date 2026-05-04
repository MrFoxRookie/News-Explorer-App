import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Auth from "../Auth/Auth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { newsApi } from "../../utils/api/NewsApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { checkToken } from "../../utils/api/auth.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    checkToken(token)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        localStorage.removeItem("token");
        setCurrentUser(null);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";

  function handleLogout() {
    setCurrentUser(null);
  }

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setError("Por favor, introduzca una palabra clave");
      setArticles([]);
      setHasSearched(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setVisibleCount(3);

    newsApi
      .getNews(keyword)
      .then((data) => {
        console.log(data);
        const articlesKeyword = data.articles.map((article) => ({
          ...article,
          keyword,
        }));

        setArticles(articlesKeyword);
      })
      .catch(() => {
        setError(
          "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div
          className={`app__background ${isSavedNews ? "app__background_white" : ""}`}
        >
          <Header
            onSignInClick={() => setIsPopupOpen(true)}
            isSavedNews={isSavedNews}
            handleLogout={handleLogout}
          ></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  onSearch={handleSearch}
                  articles={articles}
                  isLoading={isLoading}
                  error={error}
                  hasSearched={hasSearched}
                  visibleCount={visibleCount}
                  setVisibleCount={setVisibleCount}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  currentUser={currentUser}
                  isAuthLoading={isAuthLoading}
                >
                  <SavedNews />{" "}
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer></Footer>
        <PopupWithForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          <Auth isOpen={isPopupOpen} closeForm={() => setIsPopupOpen(false)} />
        </PopupWithForm>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
