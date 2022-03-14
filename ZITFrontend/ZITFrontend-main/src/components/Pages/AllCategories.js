import React, { Component } from "react";
import { variables } from "../../variables.js";
import axios from "axios";
import AdminDashboard from "../Element/AdminDashboard.js";
import { Link } from "react-router-dom";

export class AllCategories extends Component {
  keyToken;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],

      Id: 0,
      Name: "",
      NumberOfErrands: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    fetch(variables.API_URL + "Categories/all", {
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

  delete = async (id) => {
    axios.delete(variables.API_URL + "Categories/" + id, {
      headers: {
        Authorization: `Bearer ${this.keyToken}`,
      },
    });
  };
  componentDidMount() {
    this.refreshList();
  }

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        <AdminDashboard />
        <div class="errands-list">
          <div class="container">
            <h2>Lista Kategorii</h2>
            <hr />
            <div class="row">
              <table>
                <tbody>
                  <tr>
                    <td>Id Kategorii</td>
                    <td>Nazwa Kategorii</td>
                    <td>Liczba zleceń</td>
                    <td>Akcja</td>
                  </tr>
                  {categories.map((category) => (
                    <tr>
                      <td>{category.Id}</td>
                      <td>{category.Name}</td>
                      <td>{category.NumberOfErrands}</td>
                      <td>
                        <Link
                          to={"#"}
                          className="btn btn-primary m-1"
                          onClick={() =>
                            this.delete(category.Id).then(() => {
                              alert("Usunięto kategorie");
                              this.refreshPage();
                            })
                          }
                        >
                          Usuń
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AllCategories;
