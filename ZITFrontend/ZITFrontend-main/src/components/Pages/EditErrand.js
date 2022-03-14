import React from "react";
import axios from "axios";
import { variables } from "./../../variables.js";
import Banner from "../Element/Banner";
import { Button } from "react-bootstrap";

class EditErrand extends React.Component {
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
  }

  componentDidMount() {
    const url = window.location.pathname.split("/");
    axios
      .get(variables.API_URL + "errands/" + url[2], {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      })
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

  UpdateOffer = () => {
    const url = window.location.pathname.split("/");
    axios.put(
      variables.API_URL + "errands/" + url[2],
      {
        Id: Number(url[2]),
        Rate: Number(this.state.Rate),
        Localization: this.state.Localization,
        Description: this.state.Description,
        Name: this.state.Name,
        DateOfExecution: this.state.DateOfExecution,
        Type: Number(this.state.Type),
        CategoryId: Number(this.state.CategoryId),
        Status: Number(this.state.Status),
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };

  render() {
    return (
      <>
        <Banner name="Edycja Zlecenia" />
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <p></p>
              <form>
                <div className="form-group">
                  <label>Tytuł</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={this.state.Name}
                    onChange={this.onChangeName}
                    placeholder="Wprowadź tytuł"
                  />
                </div>
                <div className="form-group">
                  <label>Opis</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={this.state.Description}
                    onChange={this.onChangeDescription}
                    placeholder="Wprowadź Opis"
                  />
                </div>
                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="text"
                    className="form-control"
                    name="deadline"
                    value={this.state.DateOfExecution}
                    onChange={this.onChangeDateOfExecution}
                    placeholder="Wprowadź deadline"
                  />
                </div>
                <div className="form-group">
                  <label>Wynagrodzenie</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rate"
                    value={this.state.Rate}
                    onChange={this.onChangeRate}
                    placeholder="Wprowadź wynagrodzenie"
                  />
                </div>
                <div className="form-group">
                  <label>Lokalizacja</label>
                  <input
                    type="text"
                    className="form-control"
                    name="localization"
                    value={this.state.Localization}
                    onChange={this.onChangeLocalization}
                    placeholder="Podaj lokalizacje"
                  />
                </div>
                <Button
                  variant="primary"
                  class="btn navbar-btn"
                  onClick={this.UpdateOffer}
                >
                  Zmień
                </Button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditErrand;
