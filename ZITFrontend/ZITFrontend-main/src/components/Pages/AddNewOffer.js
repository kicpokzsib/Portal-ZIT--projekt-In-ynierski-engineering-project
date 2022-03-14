import React, { useHistory } from "react";
import { variables } from "./../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import Dashboard from "../Element/Dashboard";

class AddNewOffer extends React.Component {
  history = useHistory;
  constructor(props) {
    super(props);
    this.state = {
      Localization: "",
      Description: "",
      Name: "",
      Rate: "",
      IsPromoted: 0,
      DateOfExectution: "",
      CategoryId: 1,
      PrincipalId: 0,
      categories: [],
      Id: 0,
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
    this.handleChange = this.handleChange.bind(this);
    this.isValid = false;
    this.message = "";
    this.titleRegex = /^.{6,}$/;
    this.isValid1 = false;
    this.message1 = "";
    this.descRegex = /^.{20,}$/;
    this.checkMe = "disabled";
  }

  AddNewOffer = async () => {
    this.state.PrincipalId = this.idToken;

    axios.post(
      variables.API_URL + "errands",
      {
        PrincipalId: Number(this.state.PrincipalId),
        Localization: this.state.Localization,
        Description: this.state.Description,
        Name: this.state.Name,
        Rate: Number(this.state.Rate),
        IsPromoted: Number(this.state.IsPromoted),
        DateOfExectution: this.state.DateOfExectution,
        CategoryId: Number(this.state.CategoryId),
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeTitle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var title = e.target.value;
    if (this.titleRegex.test(title)) {
      this.isValid = true;
      this.message = "Tytuł prawidłowy";
    } else {
      this.message = "Tytuł musi posiadać minimum 6 znaków";
      this.isValid = false;
    }
  };

  handleChangeDesc = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var desc = e.target.value;
    if (this.descRegex.test(desc)) {
      this.isValid1 = true;
      this.message1 = "Opis prawidłowy";
    } else {
      this.message1 = "Rozwiń swój opis";
      this.isValid1 = false;
    }
  };

  handleChangeType = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    var type = e.target.value;
    if (type !== "start") {
      this.isValid2 = true;
      this.message2 = "Wybrano typ raportu";
    } else {
      this.message2 = "Wybierz typ raportu";
      this.isValid2 = false;
    }
  };

  render() {
    var checkMe2 = "";
    if (
      this.isValid === true &&
      this.isValid1 === true &&
      this.isValid2 === true
    ) {
      this.checkMe = checkMe2;
    } else {
      this.checkMe = "disabled";
    }
    const { categories } = this.state;
    return (
      <>
        <Banner name="Nowe Zlecenie" />
        <Dashboard />
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <form>
                <div className="form-group">
                  <label>Tytuł</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    onChange={this.handleChangeTitle}
                    value={this.state.Name}
                    placeholder="Podaj tytuł zlecenia"
                  />
                  <div
                    className={`message ${this.isValid ? "success" : "error"}`}
                  >
                    {this.message}
                  </div>
                </div>

                <div className="form-group">
                  <label>Opis</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="Description"
                    onChange={this.handleChangeDesc}
                    value={this.state.Description}
                    placeholder="Podaj opis zlecenia"
                  />
                  <div
                    className={`message1 ${
                      this.isValid1 ? "success" : "error"
                    }`}
                  >
                    {this.message1}
                  </div>
                </div>
                <div className="form-group">
                  <label>Termin wykonania</label>
                  <input
                    type="text"
                    className="form-control"
                    name="DateOfExectution"
                    onChange={this.handleChange}
                    value={this.state.DateOfExectution}
                    placeholder="np. 2020-11-10"
                  />
                </div>

                <div className="form-group">
                  <label>Kategoria</label>
                  <select
                    class="form-control"
                    name="CategoryId"
                    value={this.state.selectValue}
                    onChange={this.handleChangeType}
                  >
                    <option value="start">Wybierz kategorie</option>
                    {categories.map((emp) => (
                      <option value={emp.Id}>{emp.Name}</option>
                    ))}
                  </select>
                  <div
                    className={`message2 ${
                      this.isValid2 ? "success" : "error"
                    }`}
                  >
                    {this.message2}
                  </div>
                </div>

                <div className="form-group">
                  <label>Wynagrodzenie</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Rate"
                    onChange={this.handleChange}
                    value={this.state.Rate}
                    placeholder="Podaj kwotę"
                  />
                </div>

                <div className="form-group">
                  <label>Lokalizacja</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Localization"
                    onChange={this.handleChange}
                    value={this.state.Localization}
                    placeholder="Podaj lokalizacje"
                  />
                </div>
                <div className="form-group">
                  <label>Czy Promowane</label>
                  <select
                    class="form-control"
                    name="IsPromoted"
                    value={this.state.selectValue}
                    onChange={this.handleChange}
                  >
                    <option value={Number(0)}>Nie</option>
                    <option value={Number(1)}>Tak</option>
                  </select>
                </div>
                <button
                  class="btn btn-primary mt-2"
                  type="button"
                  href="/zlecenia"
                  disabled={String(this.checkMe)}
                  onClick={() =>
                    this.AddNewOffer().then(() => {
                      alert("Dodano zlecenie");
                    })
                  }
                >
                  Utwórz zlecenie
                </button>
                <div class="col-sm-3"></div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddNewOffer;
