import React, { Component } from "react";
import { variables } from "./../../variables.js";
import AdminDashboard from "../Element/AdminDashboard.js";
import { Link } from "react-router-dom";

export class AllUsers extends Component {
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
    fetch(variables.API_URL + "personsusers/notbanned", {
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
            <h2>Użytkownicy strony</h2>
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
                        <Link
                          to={"/banowanie/" + user.Id}
                          className="btn btn-primary m-1"
                        >
                          Zbanuj
                        </Link>
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
export default AllUsers;
