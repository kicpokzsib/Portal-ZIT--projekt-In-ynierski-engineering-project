import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "../Element/AdminDashboard.js";

export class AdminErrands extends Component {
  keyToken;
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
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    fetch(variables.API_URL + "errands/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ errands: data });
      });
  }

  deleteTask = async (id) => {
    axios.delete(variables.API_URL + "errands/" + id, {
      headers: {
        Authorization: `Bearer ${this.keyToken}`,
      },
    });
  };

  componentDidMount() {
    this.refreshList();
  }

  changeOfferName = (e) => {
    this.setState({ Name: e.target.value });
  };

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { errands } = this.state;
    return (
      <>
        <AdminDashboard />
        <div class="errands-list">
          <div class="container">
            <h2>Zlecenia</h2>
            <hr />
            <div class="row">
              <table>
                <tbody>
                  <tr>
                    <td>Id Zlecenia</td>
                    <td>Nazwa Zlecenia</td>
                    <td>Akcje</td>
                  </tr>
                  {errands.map((errand) => (
                    <tr>
                      <td>{errand.Id}</td>
                      <td>{errand.Name}</td>
                      <Link
                        to={"/zlecenie/" + errand.Id}
                        class="btn btn-primary m-2"
                      >
                        <i class="bi bi-eye"> Wyświetl</i>
                      </Link>

                      <Link
                        to=""
                        class="btn btn-primary"
                        onClick={() =>
                          this.deleteTask(errand.Id).then(() => {
                            alert("Usunięto zlecenie");
                            this.refreshPage();
                          })
                        }
                      >
                        <i class="bi bi-trash"> Usuń</i>
                      </Link>
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
export default AdminErrands;
