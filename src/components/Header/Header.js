import React from "react";
import headerLogo from "../../images/mesto.SVG";
import { useLocation, Link } from "react-router-dom";

function Header({ userEmailInHeader,onLogoutProfile }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="логотип" />

      <p className="header__email">
        {location.pathname === "/" ? userEmailInHeader : ""}


      {location.pathname !== "/" ? (
        location.pathname === "/sign-up" ? (
          <Link className="header__link" to={location.pathname === "/sign-up" && "/sign-in"}>Войти</Link>
        ) : (
          <Link className="header__link" to={location.pathname === "/sign-in" && "/sign-up"}>
            Регистрация
          </Link>
        )
      ) : (
        <Link
          onClick={location.pathname === "/" && onLogoutProfile}
          className="header__link header__link_profile" to="/sign-in">Выйти</Link>
      )}
    </p>
    </header>
  );
}

export default Header;
