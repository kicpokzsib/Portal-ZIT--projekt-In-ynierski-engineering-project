import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import axios from "axios";

export class UserErrandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: 0,
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

      Mark: 1,
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    this.UserId = this.idToken;

    fetch(variables.API_URL + "errands/activeCommissioned/" + this.UserId, {
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

  endTask(id) {
    axios.post(
      variables.API_URL + "errands/endAndMark",
      {
        ErrandId: id,
        Mark: Number(this.state.Mark),
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  }
  deleteTask(id) {
    axios.delete(variables.API_URL + "errands/" + id, {
      headers: {
        Authorization: `Bearer ${this.keyToken}`,
      },
    });
  }
  readd(id) {
    this.UserId = this.idToken;

    axios.post(
      variables.API_URL + "errands/readd",
      {
        ErrandId: id,
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
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { errands } = this.state;

    return (
      <>
        <Banner name="Stworzone Zlecenia" />
        <Dashboard />
        <div class="errands-list">
          <div class="container">
            <div class="row">
              <Row xs={1} md={2} className="g-3">
                {errands.map((errand) => (
                  <Col>
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
                          to={"/edytuj-zlecenie/" + errand.Id}
                          class="btn btn-secondary"
                        >
                          Edytuj zlecenie
                        </Link>
                        <select
                          name="Mark"
                          value={this.state.selectValue}
                          onChange={this.handleChange}
                        >
                          <option value={null}>Ocena Usera</option>

                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                        <Link
                          to=""
                          class="btn btn-secondary"
                          onClick={() => this.endTask(errand.Id)}
                        >
                          Zakoncz Zlecenie
                        </Link>
                        <Link
                          to={"/applicants/" + errand.Id}
                          class="btn btn-secondary"
                        >
                          Wybierz Pracownika
                        </Link>
                        <Link
                          to=""
                          class="btn btn-secondary"
                          onClick={() => this.deleteTask(errand.Id)}
                        >
                          Usun
                        </Link>
                        <Link
                          to=""
                          class="btn btn-secondary"
                          onClick={() => this.readd(errand.Id)}
                        >
                          Dodaj Ponownie
                        </Link>
                      </Card.Body>
                    </Card>
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
export default UserErrandsList;
