// import { Link } from "react-router-dom";
import logoutIconBlack from "../../images/navigation__logout-white.svg";
import logoutIconWhite from "../../images/navigation__logout-black.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect } from "react";

function Navigation({
  onSignInClick,
  isSavedNews,
  handleLogout,
  isMenuOpen,
  handleMenuToggle,
}) {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  function handleLogoutClick() {
    handleLogout();
    handleMenuToggle();
  }

  return (
    <div
      className={`navigation 
  ${isSavedNews ? "navigation_theme_dark" : ""} 
  ${isMenuOpen ? "navigation_open" : ""}  ${isSavedNews && isMenuOpen ? "navigation_mobile-light" : ""}`}
    >
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `navigation__home ${isActive ? "navigation__home_active" : ""}`
        }
        onClick={handleMenuToggle}
      >
        Home
      </NavLink>
      {currentUser && (
        <NavLink
          to="/saved-news"
          className={({ isActive }) =>
            `navigation__saved-articles ${
              isActive ? "navigation__saved-articles_active" : ""
            }`
          }
          onClick={handleMenuToggle}
        >
          Saved Articles
        </NavLink>
      )}
      {currentUser ? (
        <div className="navigation__button" onClick={handleLogoutClick}>
          <p className="navigation__logout">{currentUser.username}</p>
          <img
            src={isSavedNews ? logoutIconWhite : logoutIconBlack}
            alt="Logout"
            className="navigation__logout-icon"
          />
        </div>
      ) : (
        <p className="navigation__button" onClick={onSignInClick}>
          Signin
        </p>
      )}
    </div>
  );
}

export default Navigation;
