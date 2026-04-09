import { useState, useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ onSignInClick, isSavedNews, currentUser, handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 700) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`header
  ${isSavedNews ? "header_saved-news" : ""}
  ${isMenuOpen ? "header_menu-open" : ""}`}
      >
        <Link
          to="/"
          className={`header__title 
    ${isSavedNews ? "header__title_saved-news" : ""} 
    ${isSavedNews && isMenuOpen ? "header__title_menu-open" : ""}
  `}
        >
          NewsExplorer
        </Link>

        <button
          className={`header__menu-button ${
            isSavedNews ? "header__menu-button_dark" : ""
          }`}
          onClick={handleMenuToggle}
        ></button>

        <Navigation
          onSignInClick={onSignInClick}
          isSavedNews={isSavedNews}
          currentUser={currentUser}
          handleLogout={handleLogout}
          isMenuOpen={isMenuOpen}
          handleMenuToggle={handleMenuToggle}
        />
      </div>
    </>
  );
}

export default Header;
