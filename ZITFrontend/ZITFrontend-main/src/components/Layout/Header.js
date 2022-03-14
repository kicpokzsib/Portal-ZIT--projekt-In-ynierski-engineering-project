import React, { useEffect } from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/login";
import logo from "./../../images/logo.png";
import { fun3 } from "../logoutFunction";

function Header() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.verified);
  const username = window.sessionStorage.login;
  const adreszlecen = "/dostepnezlecenia";
  const profile = "/profil/" + username;
  const dashboard = "/dashboard/" + username;
  const dashboardAdmin = "/dashboard";
  const keyToken = window.sessionStorage.token;
  const idToken = window.sessionStorage.userIdfromToken;

  useEffect(() => {}, [loginStatus]);
  const refreshPage = () => {
    window.location.reload();
  };
  const isZalogowany = (role) => {
    if (typeof keyToken !== "undefined" && keyToken !== "null") {
      if (idToken === "1") {
        return (
          <>
            <Navbar.Collapse>
              <LinkContainer className="btn-secondary" to={profile}>
                <NavDropdown.Item>
                  <i class="bi bi-person"></i> {username}
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer
                className="na-btn btn-secondary"
                to={dashboardAdmin}
              >
                <NavDropdown.Item>Panel administracyjny</NavDropdown.Item>
              </LinkContainer>
            </Navbar.Collapse>
            <Button
              variant="primary"
              class="btn navbar-btn"
              onClick={() => {
                fun3().then(() => {
                  dispatch(logOut());
                  refreshPage();
                });
              }}
            >
              <i class="bi bi-door-closed-fill"></i> Wyloguj się
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Navbar.Collapse>
              <LinkContainer className="btn-secondary" to={profile}>
                <NavDropdown.Item>
                  <i class="bi bi-person"></i> {username}
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer className="na-btn btn-secondary" to={dashboard}>
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
            </Navbar.Collapse>
            <Button
              variant="primary"
              class="btn navbar-btn"
              onClick={() => {
                fun3().then(() => {
                  dispatch(logOut());
                  refreshPage();
                });
              }}
            >
              <i class="bi bi-door-closed-fill"></i> Wyloguj się
            </Button>
          </>
        );
      }
    } else {
      return (
        <>
          <button class="btn navbar-btn">
            <a href="/rejestracja">
              <i class="bi bi-person-fill"></i> Rejestracja
            </a>
          </button>
          <button class="btn navbar-btn">
            <a href="/logowanie">
              <i class="bi bi-lock-fill"></i> Logowanie
            </a>
          </button>
        </>
      );
    }
  };

  return (
    <header>
      <Navbar variant="light" sticky="top" expand="sm" collapseOnSelect>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img className="logo" src={logo} alt="logo" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <LinkContainer className="nav-btn btn-secondary" to={adreszlecen}>
              <NavDropdown.Item>Zlecenia</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer className="nav-btn btn-secondary" to="/kategorie">
              <NavDropdown.Item>Kategorie</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer className="nav-btn btn-secondary" to="/ranking">
              <NavDropdown.Item>Ranking</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer className="nav-btn btn-secondary" to="/kontakt">
              <NavDropdown.Item>Kontakt</NavDropdown.Item>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <div class="d-flex justify-content-end">
          {isZalogowany(loginStatus)}
        </div>
      </Navbar>
      <div className="header-hr"></div>
    </header>
  );
}
export default Header;
