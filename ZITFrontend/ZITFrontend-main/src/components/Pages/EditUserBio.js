import React, { Component } from "react";
import { variables } from "../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";
import { Button } from "react-bootstrap";

export class EditUserBio extends Component {
  username;
  constructor(props) {
    super(props);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSkillset = this.onChangeSkillset.bind(this);

    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeAdditionalInformation =
      this.onChangeAdditionalInformation.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      Id: 0,

      Firstname: "",
      Surname: "",
      DateOfBirth: "",
      AddressId: "",
      Login: "",
      Password: "",
      Role: "",
      DateOfRegistration: "",
      RankingId: "",
      Description: "",
      Skillset: "",
      City: "",
      Street: "",
      AdditionalInformation: "",
      Email: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    axios
      .get(variables.API_URL + "personsusers/" + this.idToken, {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      })
      .then((response) => {
        this.setState({
          Id: Number(this.idToken),
          Firstname: response.data.Firstname,
          Surname: response.data.Surname,
          DateOfBirth: response.data.DateOfBirth,
          Login: response.data.Login,
          Password: response.data.Password,
          Description: response.data.Description,
          Skillset: response.data.Skillset,
          City: response.data.City,
          Street: response.data.Street,
          AdditionalInformation: response.data.AdditionalInformation,
          Email: response.data.Email,
        });
      })
      .catch(function (error) {
      });
  }
  componentDidMount() {
    this.refreshList();
  }

  onChangeFirstname(e) {
    this.setState({
      Firstname: e.target.value,
    });
  }
  onChangeSurname(e) {
    this.setState({
      Surname: e.target.value,
    });
  }
  onChangeDateOfBirth(e) {
    this.setState({
      DateOfBirth: e.target.value,
    });
  }

  onChangeLogin(e) {
    this.setState({
      Login: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      Password: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      Description: e.target.value,
    });
  }
  onChangeSkillset(e) {
    this.setState({
      Skillset: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      City: e.target.value,
    });
  }
  onChangeStreet(e) {
    this.setState({
      Street: e.target.value,
    });
  }
  onChangeAdditionalInformation(e) {
    this.setState({
      AdditionalInformation: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      Email: e.target.value,
    });
  }

  UpdateUser = async () => {
    axios.put(
      variables.API_URL + "personsusers/" + this.idToken,
      {
        Firstname: this.state.Firstname,
        Surname: this.state.Surname,
        DateOfBirth: this.state.DateOfBirth,
        Login: this.state.Login,
        Password: this.state.Password,
        Description: this.state.Description,
        Skillset: this.state.Skillset,
        City: "City",
        Street: "Street",
        AdditionalInformation: "AdditionalInformation",
        Email: this.state.Email,
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
        <Banner name="Edycja Danych" />
        <Dashboard />
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <p></p>
              <form>
                <div className="form-group">
                  <label>Opis kompetencji</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Description"
                    value={this.state.Description}
                    onChange={this.onChangeDescription}
                    placeholder="Wprowadź opis swoich kompetencji"
                  />
                </div>
                <div className="form-group">
                  <label>Umiejętnosci</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Skillset"
                    value={this.state.Skillset}
                    onChange={this.onChangeSkillset}
                    placeholder="Wprowadź swoje umiejętności"
                  />
                </div>
                <button
                  class="btn btn-primary mt-2"
                  type="button"
                  href="/zlecenia"
                  onClick={() =>
                    this.UpdateUser().then(() => {
                      alert("Zmiany zapisane");
                    })
                  }
                >
                  Zapisz
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default EditUserBio;
