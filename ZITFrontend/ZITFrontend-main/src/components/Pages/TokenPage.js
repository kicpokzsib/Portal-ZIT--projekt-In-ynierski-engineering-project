import React from "react";
import Banner from "../Element/Banner";
import axios from "axios";
import { variables } from "./../../variables.js";
import { Container, Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class TokenPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.keyToken = window.sessionStorage.token;
  }

  componentDidMount() {}

  buyToken(xd) {
    axios.post(
      variables.API_URL + "Tokens",
      {
        Quantity: xd,
        IsPromotion: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  }

  render() {
    return (
      <>
        <Banner name="Zakup Tokenow" />
        <Container>
          <Row xs={1} md={4} className="g-4">
            <Col>
              <Link to={"/"}>
                <Card
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%",
                    color: "#0a0a0a",
                  }}
                >
                  <Card.Body>
                    <Card.Title>1 Token</Card.Title>
                    <Card.Text>10zł</Card.Text>
                    <Button
                      className="float-end btn btn-primary mx-1"
                      type="submit"
                      onClick={() => this.buyToken(1)}
                      color="success"
                    >
                      Kup token
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to={"/"}>
                <Card
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%",
                    color: "#0a0a0a",
                  }}
                >
                  <Card.Body>
                    <Card.Title>3 Tokeny</Card.Title>
                    <Card.Text>25zł</Card.Text>
                    <Button
                      className="float-end btn btn-primary mx-1"
                      type="submit"
                      onClick={() => this.buyToken(3)}
                      color="success"
                    >
                      Kup tokeny
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to={"/"}>
                <Card
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%",
                    color: "#0a0a0a",
                  }}
                >
                  <Card.Body>
                    <Card.Title>5 Tokenów</Card.Title>
                    <Card.Text>40zł</Card.Text>
                    <Button
                      className="float-end btn btn-primary mx-1"
                      type="submit"
                      onClick={() => this.buyToken(5)}
                      color="success"
                    >
                      Kup tokeny
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to={"/"}>
                <Card
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                    height: "100%",
                    color: "#0a0a0a",
                  }}
                >
                  <Card.Body>
                    <Card.Title>10 Tokenów</Card.Title>
                    <Card.Text>60zł</Card.Text>
                    <Button
                      className="float-end btn btn-primary mx-1"
                      type="submit"
                      onClick={() => this.buyToken(10)}
                      color="success"
                    >
                      Kup tokeny
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TokenPage;
