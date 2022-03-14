import React from "react";
import axios from "axios";
import { variables } from "./../../variables.js";
import Banner from "../Element/Banner";
import { Card } from "react-bootstrap";

class UserProfile extends React.Component {
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
      Place: "",
      NumberOfErrands: "",
      AverageRating: "",
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

  componentDidMount() {
    this.refreshList();
  }

  render() {
    return (
      <>
        <Banner name="Profil użytkownika" />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    {this.state.Firstname} {this.state.Surname}
                  </Card.Title>
                  <Card.Text>
                    Użytkownik od:{" "}
                    {this.state.DateOfRegistration.substring(0, 10)}
                  </Card.Text>
                  <Card.Text>
                    Liczba zleceń: {this.state.NumberOfErrands}
                  </Card.Text>
                  <Card.Text>
                    Ocena ogólna: {this.state.AverageRating}
                  </Card.Text>
                  <Card.Text>Pozycja w Rankingu: {this.state.Place}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md p-3">
              <h3>Pare słów o mnie</h3>
              <hr />
              {this.state.Description}
              <h3>Umiejętności</h3>
              <hr />
              {this.state.Skillset}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserProfile;
