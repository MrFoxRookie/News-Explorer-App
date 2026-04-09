function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2020 Supersite, Powered by News API</p>
      <div className="footer__clickables">
        <p>Home</p>
        <p>Practicum by Yandex</p>
        <a href="https://github.com/MrFoxRookie">
          <img
            src="src/images/footer__facebook-icon.svg"
            alt="Icono de Github"
            className="footer__logos"
          />
        </a>
        <a href="https://www.facebook.com/zahid.tejedaamaro/?locale=es_LA">
          <img
            src="src/images/footer__github-icon.svg"
            alt="Icono de Facebook"
            className="footer__logos"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
