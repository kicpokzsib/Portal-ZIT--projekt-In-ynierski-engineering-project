import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import Banner from "../Element/Banner";

export class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      UserLogin: "",
      NumberOfErrands: "",
      AverageRating: "",
    };
    this.keyToken = window.sessionStorage.token;
  }

  refreshList() {
    fetch(variables.API_URL + "rankings/all", {
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
        <Banner name="Ranking Użytkowników" />
        <div class="errands-list">
          <div class="container">
            <div class="row">
              <table>
                <tbody>
                  <tr>
                    <td>Użytkownik</td>
                    <td>Liczba wykonanych zleceń</td>
                    <td>Ocena ogólna</td>
                  </tr>
                  {users.map((user) => (
                    <tr>
                      <td>{user.UserLogin}</td>
                      <td>{user.NumberOfErrands}</td>
                      <td>{user.AverageRating}</td>
                      <Link
                        to={"/profil/" + user.UserLogin}
                        className="btn btn-primary mb-4"
                      >
                        Zobacz Profil
                      </Link>
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
export default Ranking;
