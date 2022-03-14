import React from "react";
import { Col, Row } from "react-bootstrap";
import { variables } from "./../../variables.js";
import { LinkContainer } from "react-router-bootstrap";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeKey = this.onChangeKey.bind(this);

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
      Key: "",
      Key2: "",

      categories: [],
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
    const url = window.location.toString().split("/");
    fetch(variables.API_URL + "errands/search" + url[3])
      .then((response) => response.json())
      .then((data) => {
        this.setState({ errands: data });
      });
  }

  onChangeKey(e) {
    this.setState({
      Key: e.target.value,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { categories } = this.state;
    const search =
      "/szukaj/" + this.state.Key + "&categoryName=" + this.state.Key2;
    return (
      <>
        <div className="slider">
          <div className="container searchit">
            <div className="search">
              <form>
                <Row>
                  <Col xs={5}>
                    <input
                      type="text"
                      className="form-control"
                      name="Key"
                      placeholder="Słowo kluczowe"
                      value={this.state.Key}
                      onChange={this.onChangeKey}
                    />
                  </Col>
                  <Col xs={4}>
                    <select
                      className="form-control"
                      name="Key2"
                      value={this.state.selectValue}
                      onChange={this.handleChange}
                    >
                      <option value={null}>Wybierz kategorie</option>
                      {categories.map((emp) => (
                        <option value={emp.Name}>{emp.Name}</option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <LinkContainer to={search}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Szukaj
                      </button>
                    </LinkContainer>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Slider;
