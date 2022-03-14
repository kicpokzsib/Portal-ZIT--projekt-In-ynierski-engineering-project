import React, { Component } from "react";
import { variables } from "./../../variables.js";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "../Element/AdminDashboard.js";

export class AdminReports extends Component {
  keyToken;
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      Id: 0,
      Email: "",
      Type: "",
      Description: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
  }

  refreshList() {
    fetch(variables.API_URL + "Reports", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.keyToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ reports: data });
      });
  }

  endReport = async (id) => {
    axios.delete(variables.API_URL + "Reports/" + id, {
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
    const { reports } = this.state;
    return (
      <>
        <AdminDashboard />
        <div class="errands-list">
          <div class="container">
            <h2>Raporty</h2>
            <hr />
            <div class="row">
              <table>
                <tbody>
                  <tr>
                    <td>Id Raportu</td>
                    <td>Nadawca</td>
                    <td>Typ raportu</td>
                    <td>Akcje</td>
                  </tr>
                  {reports.map((raport) => (
                    <tr>
                      <td>{raport.Id}</td>
                      <td>{raport.Email}</td>
                      <td>{raport.Type}</td>
                      <Link
                        to={"/raport/" + raport.Id}
                        className="btn btn-primary m-1"
                      >
                        Wyświetl
                      </Link>
                      <Link
                        to={"#"}
                        className="btn btn-primary m-1"
                        onClick={() =>
                          this.endReport(raport.Id).then(() => {
                            alert("Usunięto raport");
                            this.refreshPage();
                          })
                        }
                      >
                        Usuń
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
export default AdminReports;
