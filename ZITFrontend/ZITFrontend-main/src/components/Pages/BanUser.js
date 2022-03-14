import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Card } from "react-bootstrap";
import axios from "axios";
import Banner from "../Element/Banner";
import AdminDashboard from "../Element/AdminDashboard";
import { Link } from "react-router-dom";

export class BanUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,
      Description: "",
      DateTo: "",

      Firstname: "",
      Surname: "",
      DateOfRegistration: "",
      Login: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    const url = window.location.pathname.split("/");
    axios
      .get(variables.API_URL + "personsusers/" + url[2], {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      })
      .then((response) => {
        this.setState({
          UserId: url[2],
          Firstname: response.data.Firstname,
          Surname: response.data.Surname,
          Login: response.data.Login,
          DateOfRegistration: response.data.DateOfRegistration,
        });
      })
      .catch(function (error) {
      });
  }
  banUser = async (id) => {
    axios.post(
      variables.API_URL + "Bans",
      {
        UserId: this.state.UserId,
        Description: this.state.Description,
        DateTo: this.state.DateTo,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
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
        <Banner name="Banowanie Użytkownika" />
        <AdminDashboard />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Dane Usera</Card.Title>
                  <Card.Text>UserId: {this.state.UserId}</Card.Text>
                  <Card.Text>
                    Imię i Nazwisko: {this.state.Firstname} {this.state.Surname}
                  </Card.Text>
                  <Card.Text>Login: {this.state.Login}</Card.Text>
                  <Card.Text>
                    Użytkownik od:{" "}
                    {this.state.DateOfRegistration.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md m-3">
              <h3>Powód zbanowania </h3>
              <hr />
              <textarea
                type="text"
                className="form-control mb-3"
                name="Description"
                onChange={this.handleChange}
                value={this.state.Description}
                placeholder="Podaj powód bana"
              />
              <h4>Do kiedy </h4>
              <hr />
              <input
                type="text"
                className="form-control"
                name="DateTo"
                onChange={this.handleChange}
                value={this.state.DateTo}
                placeholder="Rok-Miesiąc-Dzień"
              />

              <Link
                to="/uzytkownicy-zbanowani"
                class="btn btn-primary mt-3"
                onClick={() =>
                  this.banUser(this.state.UserId).then(() => {
                    alert("Zbanowano użytkownika");
                  })
                }
              >
                Zbanuj
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default BanUser;
