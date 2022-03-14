import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import AdminDashboard from "../Element/AdminDashboard.js";

export class Messages extends Component {
  username;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      UserId: 0,
      Content: "",
      SentAt: "",
      ReceiverId: "",
      ReceiverLogin: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    fetch(variables.API_URL + "messages/sent", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ messages: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { messages } = this.state;

    if (this.idToken === "1") {
      return (
        <>
          <Banner name="Wysłane wiadomosci" />
          <AdminDashboard />
          <div class="errands-list">
            <div class="container">
              <div class="row">
                <table>
                  <tbody>
                    <tr>
                      <td>Odbiorca</td>
                      <td>Data Wyslania</td>
                      <td> </td>
                    </tr>
                    {messages.map((msg) => (
                      <tr>
                        <td>{msg.ReceiverLogin}</td>
                        <td>{msg.SentAt.substring(0, 10)}</td>
                        <Link
                          to={"/wiadomosc/" + msg.Id}
                          class="btn btn-primary mb-2"
                        >
                          Czytaj
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
    } else {
      return (
        <>
          <Banner name="Wysłane wiadomosci" />
          <Dashboard />
          <div class="errands-list">
            <div class="container">
              <div class="row">
                <table>
                  <tbody>
                    <tr>
                      <td>Odbiorca</td>
                      <td>Data Wyslania</td>
                      <td> </td>
                    </tr>
                    {messages.map((msg) => (
                      <tr>
                        <td>{msg.ReceiverLogin}</td>
                        <td>{msg.SentAt.substring(0, 10)}</td>
                        <Link
                          to={"/wiadomosc/" + msg.Id}
                          class="btn btn-primary mb-2"
                        >
                          Czytaj
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
}
export default Messages;
