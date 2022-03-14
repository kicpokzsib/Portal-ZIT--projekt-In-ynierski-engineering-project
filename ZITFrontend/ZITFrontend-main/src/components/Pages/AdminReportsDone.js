import React, { Component } from "react";
import { variables } from "../../variables.js";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
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

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { reports } = this.state;
    return (
      <>
        <AdminDashboard />
        <div class="errands-list">
          <div class="container">
            <div class="row">
              <h2>Raporty</h2>
              <hr />
              <Row xs={1} md={2} className="g-4">
                <table>
                  <tbody>
                    <tr>
                      <td>Id Raportu</td>
                      <td>Nadawca</td>
                      <td>Typ</td>
                      <td>Akcje</td>
                    </tr>
                    {reports.map((raport) => (
                      <tr>
                        <td>{raport.Id}</td>
                        <td>{raport.Email}</td>
                        <td>{raport.Type}</td>
                        <Link to={"#"} className="btn btn-primary mb-4">
                          Wyświetl
                        </Link>
                        <Link to={"#"} className="btn btn-primary mb-4">
                          Zakoncz
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AdminReports;
