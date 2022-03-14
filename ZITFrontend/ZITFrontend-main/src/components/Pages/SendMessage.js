import React from "react";
import { variables } from "./../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import AdminDashboard from "../Element/AdminDashboard.js";

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Content: "",
      SenderId: "",
      ReceiverId: 1,
      applicants: [],
      UserId: 0,
      Login: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
    this.handleChange = this.handleChange.bind(this);
  }

  SentMessage = async () => {
    axios.post(
      variables.API_URL + "Messages",
      {
        Content: this.state.Content,
        ReceiverId: Number(this.state.ReceiverId),
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };

  refreshList() {
    fetch(variables.API_URL + "errands/" + this.idToken + "/applicants/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ applicants: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { applicants } = this.state;

    if (this.idToken === "1") {
      return (
        <>
          <Banner name="Nowa Wiadomosc" />
          <AdminDashboard />
          <div class="container">
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <form>
                  <div className="form-group">
                    <label>Odbiorca</label>
                    <select
                      className="form-control"
                      name="ReceiverId"
                      value={this.state.selectValue}
                      onChange={this.handleChange}
                    >
                      <option value={null}>Wybierz z Listy</option>
                      {applicants.map((emp) => (
                        <option value={emp.UserId}>{emp.Login}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Treść</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Content"
                      onChange={this.handleChange}
                      value={this.state.Content}
                      placeholder="wiadomość"
                    />
                  </div>
                  <button
                    class="btn btn-primary"
                    type="button"
                    href="/zlecenia"
                    onClick={this.SentMessage}
                  >
                    Wyślij
                  </button>
                  <div class="col-sm-3"></div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Banner name="Nowa Wiadomosc" />
          <Dashboard />
          <div class="container">
            <div class="row">
              <div class="col-sm-3"></div>
              <div class="col-sm-6">
                <form>
                  <div className="form-group">
                    <label>Odbiorca</label>
                    <select
                      className="form-control"
                      name="ReceiverId"
                      value={this.state.selectValue}
                      onChange={this.handleChange}
                    >
                      <option value={null}>Wybierz z Listy</option>
                      {applicants.map((emp) => (
                        <option value={emp.UserId}>{emp.Login}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Treść</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Content"
                      onChange={this.handleChange}
                      value={this.state.Content}
                      placeholder="wiadomość"
                    />
                  </div>
                  <button
                    class="btn btn-primary mt-2"
                    type="button"
                    href="/zlecenia"
                    onClick={() =>
                      this.SentMessage().then(() => {
                        alert("Wysłano wiadomość");
                      })
                    }
                  >
                    Wyślij
                  </button>
                  <div class="col-sm-3"></div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default SendMessage;
