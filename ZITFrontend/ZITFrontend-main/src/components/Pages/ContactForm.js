import React from "react";
import { variables } from "../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Type: 0,
      Description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.isValid = false;
    this.message = "";
    this.isValid2 = false;
    this.message2 = "";
    this.isValid3 = false;
    this.message3 = "";
    this.descRegex = /^.{6,}$/;
    this.emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.checkMe = "disabled";
  }

  SentMessage = async () => {
    axios.post(variables.API_URL + "reports", {
      Email: this.state.Email,
      Type: Number(this.state.Type),
      Description: this.state.Description,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeEmail = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var email = e.target.value;
    if (this.emailRegex.test(email)) {
      this.isValid = true;
      this.message = "Email poprawny";
    } else {
      this.message = "Email niepoprawny";
      this.isValid = false;
    }
  };

  handleChangeType = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var type = e.target.value;
    if (type !== "start") {
      this.isValid2 = true;
      this.message2 = "Wybrano typ raportu";
    } else {
      this.message2 = "Wybierz typ raportu";
      this.isValid2 = false;
    }
  };

  handleChangeDescription = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var desc = e.target.value;
    if (this.descRegex.test(desc)) {
      this.isValid3 = true;
      this.message3 = "Wiadomość prawidłowa";
    } else {
      this.message3 = "Rozwiń swoją wiadomość";
      this.isValid3 = false;
    }
  };

  render() {
    var checkMe2 = "";
    if (
      this.isValid === true &&
      this.isValid2 === true &&
      this.isValid3 === true
    ) {
      this.checkMe = checkMe2;
    } else {
      this.checkMe = "disabled";
    }
    return (
      <>
        <Banner name="Formularz kontaktowy" />
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <p></p>
              <h2>
                Wypełnij formularz, a skontaktujemy się najszybciej jak to
                możliwe!
              </h2>
              <hr />
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="Email"
                    onChange={this.handleChangeEmail}
                    value={this.state.Email}
                    className="form-control mb-3"
                    placeholder="Podaj swój adres e-mail"
                  />
                  <div
                    className={`message ${this.isValid ? "success" : "error"}`}
                  >
                    {this.message}
                  </div>
                </div>
                <div className="form-group">
                  <label>Typ raportu: </label>
                  <select
                    class="form-control mb-3"
                    name="Type"
                    value={this.state.selectValue}
                    onChange={this.handleChangeType}
                  >
                    <option value="start">Wybierz typ raportu</option>
                    <option value={Number(0)}>Zgloszenie</option>
                    <option value={Number(1)}>Blad</option>
                    <option value={Number(2)}>Inne</option>
                  </select>
                  <div
                    className={`message2 ${
                      this.isValid2 ? "success" : "error"
                    }`}
                  >
                    {this.message2}
                  </div>
                </div>
                <div className="form-group">
                  <label>Wiadomość</label>
                  <textarea
                    type="text"
                    className="form-control mb-3"
                    name="Description"
                    onChange={this.handleChangeDescription}
                    value={this.state.Description}
                  />
                  <div
                    className={`message3 ${
                      this.isValid3 ? "success" : "error"
                    }`}
                  >
                    {this.message3}
                  </div>
                </div>
                <button
                  class="btn btn-primary"
                  type="button"
                  href="/zlecenia"
                  disabled={String(this.checkMe)}
                  onClick={() =>
                    this.SentMessage().then(() => {
                      alert("Raport wysłany");
                    })
                  }
                >
                  Wyślij
                </button>
              </form>
            </div>
            <div class="col-sm-3"></div>
          </div>
        </div>
      </>
    );
  }
}

export default ContactForm;
