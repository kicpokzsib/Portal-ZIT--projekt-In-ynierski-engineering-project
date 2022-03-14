import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useSelector } from "react-redux";
import { Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Dashboard() {
  const username = useSelector((state) => state.username);
  return (
    <Navbar className="navbarDashboard">
      <Navbar.Collapse>
        <NavDropdown title="Mój profil" id="collasible-nav-dropdown">
          <LinkContainer to={"/edytuj-dane/" + username}>
            <NavDropdown.Item>Edytuj dane</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/dodaj-biografie/" + username}>
            <NavDropdown.Item>Dodaj biografie</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to={"/profil/" + username}>
            <NavDropdown.Item>Podejrzyj swój profil</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown title="Zlecenia" id="collasible-nav-dropdown">
          <LinkContainer to={"/twoje-zlecenia/" + username}>
            <NavDropdown.Item>Zarządzaj swoimi zleceniami</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/przyjete-zlecenia/" + username}>
            <NavDropdown.Item>Przyjęte zlecenia</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to={"/zakonczone-zlecenia/" + username}>
            <NavDropdown.Item>Zobacz zakończone zlecenia</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to={"/dodaj-zlecenie/" + username}>
            <NavDropdown.Item>Dodaj nowe zlecenie</NavDropdown.Item>
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
          <LinkContainer to={"/wyslij/" + username}>
            <NavDropdown.Item>Wyślij wiadomość</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Dashboard;
