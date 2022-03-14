import React from "react";
import { variables } from "./../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import { Card } from "react-bootstrap";

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,

      Firstname: "",
      Surname: "",
      DateOfBirth: "",
      AddressId: "",
      Login: "",
      Password: "",
      Role: "",
      DateOfRegistration: "",
      RankingId: "",
      Description: "",
      Skillset: "",
      NumberOfErrands: "",
      AverageRating: "",
      Place: "",
      NumberOfTokens: "",
    };
    this.keyToken = window.sessionStorage.token;
  }

  refreshList() {
    const url = window.location.pathname.split("/");
    fetch(variables.API_URL + "personsusers?login=" + url[2], {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const id = Number(data);
        this.state.id = Number(data);

        axios
          .get(variables.API_URL + "personsusers/" + id, {
            headers: {
              Authorization: `Bearer ${this.keyToken}`,
            },
          })
          .then((response) => {
            this.setState({
              Firstname: response.data.Firstname,
              Surname: response.data.Surname,
              DateOfBirth: response.data.DateOfBirth,
              Login: response.data.Login,
              Password: response.data.Password,
              Description: response.data.Description,
              Skillset: response.data.Skillset,
              DateOfRegistration: response.data.DateOfRegistration,
            });
          })
          .catch(function (error) {
          });

        axios
          .get(variables.API_URL + "Rankings/" + id, {
            headers: {
              Authorization: `Bearer ${this.keyToken}`,
            },
          })
          .then((response) => {
            this.setState({
              Place: response.data.Place,
              NumberOfErrands: response.data.NumberOfErrands,
              AverageRating: response.data.AverageRating,
            });
          })
          .catch(function (error) {
          });
      });
  }

  getTokens() {
    fetch(variables.API_URL + "Tokens", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ NumberOfTokens: data });
      });
  }

  componentDidMount() {
    this.refreshList();
    this.getTokens();
  }

  render() {
    return (
      <>
        <Banner name="Dashboard" />
        <Dashboard />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Text>
                    Liczba tokenów: {this.state.NumberOfTokens}
                  </Card.Text>
                  <Card.Text>
                    Liczba zleceń: {this.state.NumberOfErrands}
                  </Card.Text>
                  <Card.Text>Pozycja w rankingu: {this.state.Place}</Card.Text>
                  <Card.Text>Moja ocena: {this.state.AverageRating}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md p-3">
              <h3>
                Witaj, {this.state.Firstname} {this.state.Surname} !
              </h3>
              <hr />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardHome;
