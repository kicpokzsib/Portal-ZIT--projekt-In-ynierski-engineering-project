import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";

export class AllPromotedErrands extends Component {
  keyToken;
  constructor(props) {
    super(props);
    this.state = {
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
    this.checkMe = "hidden";
  }

  takeOffer = (id) => {
    const idusera = this.idTokens;
    axios.post(
      variables.API_URL + "errands/take",
      {
        ErrandId: id,
        UserId: idusera,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };

  refreshList() {
    fetch(variables.API_URL + "errands/promoted/all", {
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
  }

  componentDidMount() {
    this.refreshList();
  }

  changeOfferName = (e) => {
    this.setState({ Name: e.target.value });
  };

  render() {
    const { errands } = this.state;
    const tokenToString = String(this.keyToken);
    if (tokenToString !== "undefined" && tokenToString !== "null") {
      this.checkMe = "";
    }
    if (errands.length === 0) {
      return (
        <>
          <div class="errands-list">
            <div class="container">
              <h2>Brak zleceń promowanych</h2>
              <p>
                Obecnie nie ma żadnych zleceń promowanych, sprawdź pozostałe
                zlecenia
              </p>
              <hr />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div class="errands-list">
            <div class="container">
              <h2>Promowane zlecenia</h2>
              <hr />
              <Row xs={1} md={2} className="g-4">
                {errands.map((errand) => (
                  <Col>
                    <Link to={"/zlecenie/" + errand.Id}>
                      <Card
                        style={{
                          backgroundColor: "#fff",
                          width: "100%",
                          height: "100%",
                          color: "#0a0a0a",
                        }}
                      >
                        <Card.Body>
                          <Card.Title>
                            {errand.Name.substring(0, 60) + "..."}
                          </Card.Title>
                          <Card.Text>
                            Opis: {errand.Description.substring(0, 140) + "..."}
                          </Card.Text>
                          <Card.Text>Stawka: {errand.Rate}</Card.Text>
                          <Card.Text>
                            Lokalizacja: {errand.Localization}
                          </Card.Text>
                          <Button
                            className="float-end btn btn-primary mx-1"
                            type="submit"
                            onClick={() => this.takeOffer(errand.Id)}
                            color="success"
                            hidden={String(this.checkMe)}
                          >
                            Przyjmij Zlecenie
                          </Button>
                          <Link
                            to={"/zlecenie/" + errand.Id}
                            className="float-end btn btn-secondary"
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
        </>
      );
    }
  }
}
export default AllPromotedErrands;
