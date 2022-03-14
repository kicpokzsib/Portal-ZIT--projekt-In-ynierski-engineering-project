import React from "react";
import Banner from "../Element/Banner";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
class Searchpage extends React.Component {
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
  }

  componentDidMount() {
    const url = window.location.toString().split("/");
    fetch(variables.API_URL + "errands/search?key=" + url[4])
      .then((response) => response.json())
      .then((data) => {
        this.setState({ errands: data });
      });
  }

  render() {
    const { errands } = this.state;
    const search = "Wyniki wyszukiwania:";
    if (errands.length === 0) {
      return (
        <>
          <Banner name={search.substring(0, 40)} />
          <div class="container">
            <hr />
            <div class="row">
              <h2>Brak zleceń</h2>
              <p>
                Obecnie nie ma zleceń pasujących do twoich kryteriów
                wyszukiwania.
              </p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Banner name={search.substring(0, 40)} />
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
                            <button
                              class="btn btn-secondary"
                              type="submit"
                              onClick={this.takeOffer}
                              color="success"
                            >
                              Przyjmij Zlecenie
                            </button>{" "}
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

export default Searchpage;
