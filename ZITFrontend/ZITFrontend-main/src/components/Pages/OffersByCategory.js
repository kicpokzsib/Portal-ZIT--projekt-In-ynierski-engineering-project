import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Banner from "../Element/Banner";

export class OffersByCategory extends Component {
  keyToken;
  constructor(props) {
    super(props);

    this.state = {
      CategoryName: "",

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

  refreshList() {
    const url = window.location.pathname.split("/");
    fetch(variables.API_URL + "categories/" + url[3], {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.CategoryName = data.Name;

        fetch(variables.API_URL + "errands/all/" + url[3], {
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
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeOfferName = (e) => {
    this.setState({ Name: e.target.value });
  };

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

  render() {
    const { errands } = this.state;
    const tokenToString = String(this.keyToken);
    if (tokenToString !== "undefined" && tokenToString !== "null") {
      this.checkMe = "";
    }
    if (errands.length === 0) {
      return (
        <>
          <Banner name={this.CategoryName} />
          <div class="container">
            <hr />
            <div class="row">
              <h2>Brak zleceń</h2>
              <p>Obecnie nie ma zleceń w danej kategorii</p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Banner name={this.CategoryName} />
          <div class="errands-list">
            <div class="container">
              <div class="row">
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
                              Opis:{" "}
                              {errand.Description.substring(0, 140) + "..."}
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
          ;
        </>
      );
    }
  }
}
export default OffersByCategory;
