import React, { Component } from "react";
import Banner from "../Element/Banner";
import AdminDashboard from "../Element/AdminDashboard";
import axios from "axios";
import { variables } from "../../variables.js";
import { Card } from "react-bootstrap";

export class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Type: "",
      Description: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    const url = window.location.pathname.split("/");
    axios
      .get(variables.API_URL + "reports/" + url[2], {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      })
      .then((response) => {
        this.setState({
          Email: response.data.Email,
          Type: response.data.Type,
          Description: response.data.Description,
        });
      })
      .catch(function (error) {
      });
  }

  componentDidMount() {
    this.refreshList();
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <Banner name="Szczegóły Raportu" />
        <AdminDashboard />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Szczegóły Raportu</Card.Title>
                  <Card.Text>Email: {this.state.Email}</Card.Text>
                  <Card.Text>Typ: {this.state.Type}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div class="col-md p-3">
              <h3>Opis: </h3>
              <hr />
              <Card.Text className="form-control">
                {this.state.Description}
              </Card.Text>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ReportPage;
