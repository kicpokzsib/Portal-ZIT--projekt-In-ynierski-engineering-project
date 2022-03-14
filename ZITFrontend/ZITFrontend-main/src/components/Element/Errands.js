import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import AllPromotedErrands from "../Element/AllPromotedErrands";

export class Errands extends Component {
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
    fetch(variables.API_URL + "errands/notpromoted/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer sasa`,
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
    return (
      <div class="errands-list">
        <div class="container">
          <AllPromotedErrands />
          <div class="row">
            <h2>Pozostałe zlecenia</h2>
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
      </div>
    );
  }
}
export default Errands;
