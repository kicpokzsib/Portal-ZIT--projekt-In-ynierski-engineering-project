import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useSelector } from "react-redux";
import { Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AdminDashboard() {
  const username = useSelector((state) => state.username);
  return (
    <Navbar className="navbarDashboard">
      <Navbar.Collapse>
        <NavDropdown title="Zlecenia" id="collasible-nav-dropdown">
          <LinkContainer to={"/zarzadzaj"}>
            <NavDropdown.Item>Zarządzaj zleceniami</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/zakonczone"}>
            <NavDropdown.Item>Zobacz zakończone zlecenia</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown title="Raporty" id="collasible-nav-dropdown">
          <LinkContainer to={"/raporty"}>
            <NavDropdown.Item>Wyświetl raporty</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown title="Użytkownicy" id="collasible-nav-dropdown">
          <LinkContainer to={"/uzytkownicy"}>
            <NavDropdown.Item>
              Wyświetl wszystkich użytkowników
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/uzytkownicy-zbanowani"}>
            <NavDropdown.Item>
              Wyświetl zbanowanych użytkowników
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown title="Kategorie" id="collasible-nav-dropdown">
          <LinkContainer to={"/lista-kategorii"}>
            <NavDropdown.Item>Lista Kategorii</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to={"/dodaj-kategorie"}>
            <NavDropdown.Item>Stwórz nowa</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown title="Wiadomości" id="collasible-nav-dropdown">
          <LinkContainer to={"/wiadomosci/" + username}>
            <NavDropdown.Item>Odebrane</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/wyslane/" + username}>
            <NavDropdown.Item>Wysłane</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to={"/wyslij-wiadomosc"}>
            <NavDropdown.Item>Wyślij wiadomość</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminDashboard;
