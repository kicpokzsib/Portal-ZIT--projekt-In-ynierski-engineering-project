import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>React app</h5>
            </div>
            <div className="col-md-3">
              <h5>Ogólne</h5>
              <ul>
                <li>
                  <Link to={""}>O nas</Link>
                </li>
                <li>
                  <Link to={""}>Aktualności</Link>
                </li>
                <li>
                  <Link to={""}>Mapa kategorii</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Dla zlecających</h5>
              <ul>
                <li>
                  <Link to={""}>Jak zlecać</Link>
                </li>
                <li>
                  <Link to={""}>Zobacz co zlecają inni</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Dla wykonawców</h5>
              <ul>
                <li>
                  <Link to={""}>Jak zdobywać zlecenia?</Link>
                </li>
                <li>
                  <Link to={""}>Zlecenia na e-mail</Link>
                </li>
                <li>
                  <Link to={""}>Dołącz do wykonawców</Link>
                </li>
                <li>
                  <Link to={""}>Cennik</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <span> @2022. Made with &hearts; by grupa Frontendowa</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
