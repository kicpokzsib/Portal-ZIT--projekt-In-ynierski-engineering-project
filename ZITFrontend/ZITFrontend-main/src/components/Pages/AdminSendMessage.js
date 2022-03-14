import React from "react";
import { variables } from "../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import AdminDashboard from "../Element/AdminDashboard.js";

class AdminSendMessage extends React.Component {
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
    this.isValid = false;
    this.message = "";
    this.isValid2 = false;
    this.message2 = "";
    this.descRegex = /^.{6,}$/;
    this.checkMe = "disabled";
  }

  SentMessage = () => {
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
    fetch(variables.API_URL + "PersonsUsers/all", {
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

  handleChangeType = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var type = e.target.value;
    if (type !== "start") {
      this.isValid = true;
      this.message = "Wybrano odbiorcę";
    } else {
      this.message = "Wybierz odbiorcę";
      this.isValid = false;
    }
  };

  handleChangeDescription = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var desc = e.target.value;
    if (this.descRegex.test(desc)) {
      this.isValid2 = true;
      this.message2 = "Wiadomość prawidłowa";
    } else {
      this.message2 = "Rozwiń swoją wiadomość";
      this.isValid2 = false;
    }
  };

  render() {
    const { applicants } = this.state;

    var checkMe2 = "";
    if (this.isValid === true && this.isValid2 === true) {
      this.checkMe = checkMe2;
    } else {
      this.checkMe = "disabled";
    }

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
                    required
                    onChange={this.handleChangeType}
                  >
                    <option value="start">Wybierz z Listy</option>
                    {applicants.map((emp) => (
                      <option value={emp.Id}>{emp.Login}</option>
                    ))}
                  </select>
                  <div
                    className={`message ${this.isValid ? "success" : "error"}`}
                  >
                    {this.message}
                  </div>
                </div>
                <div className="form-group">
                  <label>Treść</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="Content"
                    onChange={this.handleChangeDescription}
                    value={this.state.Content}
                    placeholder="Twoja wiadomość"
                    required
                  />
                  <div
                    className={`message2 ${
                      this.isValid2 ? "success" : "error"
                    }`}
                  >
                    {this.message2}
                  </div>
                </div>
                <button
                  class="btn btn-primary mt-3"
                  type="button"
                  href="/zlecenia"
                  onClick={() =>
                    this.SentMessage().then(() => {
                      alert("Wiadomość wysłana");
                    })
                  }
                  disabled={String(this.checkMe)}
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

export default AdminSendMessage;
