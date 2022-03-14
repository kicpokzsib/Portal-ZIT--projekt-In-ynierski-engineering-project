import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Card } from "react-bootstrap";
import axios from "axios";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import { Link } from "react-router-dom";
export class MessageDetails extends Component {
  keyToken;
  username;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      UserId: 0,
      Content: "",
      SenderId: "",
      ReceiverId: 1,
      SentAt: "",
      ReceiverLogin: "",
      SenderLogin: "",
      ResponseContent: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    const url = window.location.pathname.split("/");
    axios
      .get(variables.API_URL + "messages/" + url[2], {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      })
      .then((response) => {
        this.setState({
          Content: response.data.Content,
          SentAt: response.data.SentAt,
          ReceiverLogin: response.data.ReceiverLogin,
          SenderLogin: response.data.SenderLogin,
        });
      })
      .catch(function (error) {
      });
  }
  SentMessage = async () => {
    fetch(variables.API_URL + "personsusers?login=" + this.state.SenderLogin, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.state.ReceiverId = Number(data);

        axios.post(
          variables.API_URL + "Messages",
          {
            Content: this.state.ResponseContent,
            ReceiverId: Number(this.state.ReceiverId),
          },
          {
            headers: {
              Authorization: `Bearer ${this.keyToken}`,
            },
          }
        );
      });
  };

  componentDidMount() {
    this.refreshList();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Banner name="Wiadomosc.." />
        <Dashboard />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Szczegóły wiadomosci</Card.Title>
                  <Card.Text>
                    Wyslane: {this.state.SentAt.substring(0, 10)}
                  </Card.Text>
                  <Card.Text>Od: {this.state.SenderLogin}</Card.Text>
                  <Card.Text>Do: {this.state.ReceiverLogin}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md p-3">
              <h3>Tresc: </h3>
              <hr />
              <input
                type="text"
                className="form-control"
                value={this.state.Content}
              />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <form>
                <div className="form-group">
                  <label>Odpowiedz na wiadomość: </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="ResponseContent"
                    onChange={this.handleChange}
                    value={this.state.ResponseContent}
                    placeholder="wiadomość"
                  />
                </div>
                <Link
                  to="/zlecenia"
                  class="btn btn-primary mt-3"
                  onClick={() =>
                    this.SentMessage.then(() => {
                      alert("Odpowiedziałeś na wiadomość!");
                    })
                  }
                >
                  Wyślij Odpowiedź
                </Link>
                <div class="col-sm-3"></div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default MessageDetails;
