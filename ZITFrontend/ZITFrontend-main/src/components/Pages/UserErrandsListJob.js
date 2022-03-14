import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import axios from "axios";
export class UserErrandsListJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errandsDone: [],
      errands: [],
      modalTitle: "",
      Id: 0,
      Rate: "",
      Description: "",
      Name: "",
      Localization: "",
      Status: "",
      DateOfPublication: "",
      DateOfExecution: "",
      Type: "",
      RaportId: "",
      CategoryId: "",
      PaymentId: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    this.UserId = this.idToken;
    fetch(variables.API_URL + "errands/activeDone/" + this.UserId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ errands: data });
      });

    fetch(variables.API_URL + "errands/finishedDone/" + this.UserId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ errandsDone: data });
      });
  }

  returnTask(id) {
    this.UserId = this.idToken;

    axios.post(
      variables.API_URL + "errands/return",
      {
        ErrandId: Number(id),
        UserId: this.UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { errands, errandsDone } = this.state;
    return (
      <>
        <Banner name="Przyjęte Zlecenia" />
        <Dashboard />
        <div class="errands-list">
          <div class="container">
            <div class="row">
              <Row xs={1} md={2} className="g-3">
                {errands.map((errand) => (
                  <Col>
                    <Link to={"#"}>
                      <Card
                        style={{
                          backgroundColor: "#f3f3f3",
                          width: "100%",
                          height: "200px",
                          color: "#131313",
                        }}
                      >
                        <Card.Body>
                          <Card.Title>{errand.Name}</Card.Title>
                          <Card.Text>Stawka: {errand.Rate}</Card.Text>
                          <Card.Text>
                            Lokalizacja: {errand.Localization}
                          </Card.Text>
                          <Link
                            to={"/zlecenie/" + errand.Id}
                            class="btn btn-primary"
                          >
                            Zobacz zlecenie
                          </Link>
                          <Link
                            to=""
                            class="btn btn-primary"
                            onClick={() => this.returnTask(errand.Id)}
                          >
                            Oddaj Zlecenie
                          </Link>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
        <div class="errands-list">
          <div class="container">
            <h3>Ukonczone Zlecenia</h3>
            <hr />
            <div class="row">
              <Row xs={1} md={2} className="g-3">
                {errandsDone.map((errand) => (
                  <Col>
                    <Link to={"#"}>
                      <Card
                        style={{
                          backgroundColor: "#f3f3f3",
                          width: "100%",
                          height: "200px",
                          color: "#131313",
                        }}
                      >
                        <Card.Body>
                          <Card.Title>{errand.Name}</Card.Title>
                          <Card.Text>Stawka: {errand.Rate}</Card.Text>
                          <Card.Text>
                            Lokalizacja: {errand.Localization}
                          </Card.Text>
                          <Link
                            to={"/zlecenie/" + errand.Id}
                            class="btn btn-primary"
                          >
                            Zobacz zlecenie
                          </Link>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default UserErrandsListJob;
