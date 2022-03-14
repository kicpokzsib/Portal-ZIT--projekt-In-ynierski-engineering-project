import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";

export class ErrandAplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
      UserId: "",
      Login: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    const url = window.location.pathname.split("/");
    fetch(variables.API_URL + "errands/applicants/" + url[2], {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ applicants: data });
      });
  }
  accept = (id) => {
    const url = window.location.pathname.split("/");
    axios.post(
      variables.API_URL + "errands/accept",
      {
        ErrandId: url[2],
        UserId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };
  reject = (id) => {
    const url = window.location.pathname.split("/");
    axios
      .post(
        variables.API_URL + "errands/reject",
        {
          ErrandId: url[2],
          UserId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${this.keyToken}`,
          },
        }
      )
      .then(
        (json) => {
          if (json.data.Status === "Success") {
            alert("Data Save Successfully");
            this.props.history.push("/errands");
          }
        },
        (error) => {
          alert(error);
        }
      );
  };

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { applicants } = this.state;

    return (
      <>
        <div class="errands-list">
          <div class="container">
            <div class="row">
              <Row xs={1} md={2} className="g-3">
                {applicants.map((applicant) => (
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
                          <Card.Title>{applicant.Login}</Card.Title>

                          <Link
                            to={"/profil/" + applicant.Login}
                            class="btn btn-primary"
                          >
                            Zobacz profil
                          </Link>

                          <Link
                            to={"/"}
                            class="btn btn-secondary"
                            onClick={() => this.accept(applicant.UserId)}
                          >
                            Zaakceptuj
                          </Link>
                          <Link
                            to={"/"}
                            class="btn btn-secondary"
                            onClick={() => this.reject(applicant.UserId)}
                          >
                            Odrzuc
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
export default ErrandAplicants;
