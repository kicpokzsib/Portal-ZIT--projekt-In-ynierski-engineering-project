import React from "react";
import { variables } from "./../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import AdminDashboard from "../Element/AdminDashboard";

class DashboardAdmin extends React.Component {
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
        <Banner name="Dashboard admina" />
        <AdminDashboard />
        <div class="container">
          <div class="row">
            <div class="col-md p-3">
              <h3>Witaj w panelu administracyjnym</h3>
              <hr />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DashboardAdmin;
