import React, { Component } from "react";
import { variables } from "./../../variables.js";
import AdminDashboard from "../Element/AdminDashboard.js";
import { Button } from "react-bootstrap";
import axios from "axios";

export class BannedUsers extends Component {
  keyToken;
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      Id: 0,
      FirstName: "",
      LastName: "",
      Login: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    fetch(variables.API_URL + "personsusers/banned", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  unbanUser(id) {
    axios.delete(variables.API_URL + "bans/" + id, {
      headers: {
        Authorization: "Bearer ${this.keyToken}",
      },
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <AdminDashboard />
        <div class="errands-list">
          <div class="container">
            <h2>Użytkownicy zbanowani</h2>
            <hr />
            <div class="row">
              <table>
                <tbody>
                  <tr>
                    <td>Id Użytkownika</td>
                    <td>Imię</td>
                    <td>Nazwisko</td>
                    <td>Login</td>
                    <td>Akcja</td>
                  </tr>
                  {users.map((user) => (
                    <tr>
                      <td>{user.Id}</td>
                      <td>{user.FirstName}</td>
                      <td>{user.LastName}</td>
                      <td>{user.Login}</td>
                      <td>
                        {" "}
                        <Button
                          variant="primary"
                          class="btn navbar-btn"
                          onClick={() => this.unbanUser(user.Id)}
                        >
                          Odbanuj
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default BannedUsers;
