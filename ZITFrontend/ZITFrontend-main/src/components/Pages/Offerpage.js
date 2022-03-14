import React from "react";
import Banner from "../Element/Banner";
import axios from "axios";
import { variables } from "./../../variables.js";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Offerpage extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeLocalization = this.onChangeLocalization.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRate = this.onChangeRate.bind(this);
    this.onChangeDateOfExecution = this.onChangeDateOfExecution.bind(this);
    this.onChangeDateOfPublication = this.onChangeDateOfPublication.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);

    this.state = {
      Rate: 0,
      Localization: "",
      Description: "",
      Name: "",
      DateOfPublication: "",
      DateOfExecution: "",
      Status: 0,
      Type: 0,
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
    this.checkMe = "hidden";
  }

  takeOffer = async () => {
    const url = window.location.pathname.split("/");
    const idusera = this.idTokens;
    const id = Number(url[2]);
    axios
      .post(
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
      )
      .then((e) => {
        alert("Udalo sie");
      })
      .catch(function (eroor) {
        alert("Aplikujesz już do tego Zlecenia lub sam je stworzyłeś");
      });
  };

  componentDidMount() {
    const url = window.location.pathname.split("/");
    axios
      .get(variables.API_URL + "errands/" + url[2])
      .then((response) => {
        this.setState({
          Localization: response.data.Localization,
          Description: response.data.Description,
          Name: response.data.Name,
          Rate: response.data.Rate,
          DateOfExecution: response.data.DateOfExecution,
          DateOfPublication: response.data.DateOfPublication,
          Type: response.data.Type,
          CategoryId: response.data.CategoryId,
          Status: response.data.Status,
        });
      })
      .catch(function (error) {
      });
  }
  onChangeLocalization(e) {
    this.setState({
      Localization: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      Description: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      Name: e.target.value,
    });
  }
  onChangeRate(e) {
    this.setState({
      Rate: e.target.value,
    });
  }
  onChangeDateOfExecution(e) {
    this.setState({
      DateOfExecution: e.target.value,
    });
  }
  onChangeDateOfPublication(e) {
    this.setState({
      DateOfPublication: e.target.value,
    });
  }
  onChangeType(e) {
    this.setState({
      Type: e.target.value,
    });
  }
  onChangeStatus(e) {
    this.setState({
      Status: e.target.value,
    });
  }
  onChangeCategoryId(e) {
    this.setState({
      CategoryId: e.target.value,
    });
  }

  render() {
    const tokenToString = String(this.keyToken);
    if (tokenToString !== "undefined" && tokenToString !== "null") {
      this.checkMe = "";
    }
    return (
      <>
        <Banner name={this.state.Name} />
        <div class="container">
          <div class="row">
            <div class="col-md-auto">
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>Szczegóły zlecenia</Card.Title>
                  <Card.Text>Stawka: {this.state.Rate}</Card.Text>
                  <Card.Text>Lokalizacja: {this.state.Localization}</Card.Text>
                  <Card.Text>
                    Deadline: {this.state.DateOfExecution.substring(0, 10)}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Button
                className="float-end btn btn-primary mx-1"
                type="submit"
                onClick={() => this.takeOffer()}
                color="success"
                hidden={String(this.checkMe)}
              >
                Przyjmij Zlecenie
              </Button>
            </div>
            <div class="col-md p-3">
              <h3>Opis zlecenia: </h3>
              <hr />
              {this.state.Description}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Offerpage;
