import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      modalTitle: "",
      Id: 0,
      Name: "",
      NumberOfErrands: 0,
    };
    this.keyToken = window.sessionStorage.token;
  }

  refreshList() {
    fetch(variables.API_URL + "categories/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { categories } = this.state;

    return (
      <div class="category-list">
        <div class="container">
          <Row xs={1} md={5} className="g-4">
            {categories.map((emp) => (
              <Col>
                <Link
                  to={"/zlecenia/kategoria/" + emp.Id}
                  class="btn btn-tertiary"
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>{emp.Name}</Card.Title>
                      <i class="bi bi-caret-down-fill"></i>
                      <Card.Text>
                        Liczba zleceń: {emp.NumberOfErrands}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
export default CategoriesList;
