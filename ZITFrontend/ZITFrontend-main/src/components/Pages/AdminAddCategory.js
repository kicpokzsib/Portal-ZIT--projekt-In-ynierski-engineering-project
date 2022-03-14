import React from "react";
import { variables } from "../../variables.js";
import axios from "axios";
import Banner from "../Element/Banner";
import AdminDashboard from "../Element/AdminDashboard";
import { Link } from "react-router-dom";

class AdminAddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
    };
    this.keyToken = window.sessionStorage.token;
    this.idToken = window.sessionStorage.userIdfromToken;
    this.handleChange = this.handleChange.bind(this);
  }

  AddNewCategory = async () => {
    axios.post(
      variables.API_URL + "Categories",
      {
        Name: this.state.Name,
      },
      {
        headers: {
          Authorization: `Bearer ${this.keyToken}`,
        },
      }
    );
  };
  refreshList() {}

  componentDidMount() {
    this.refreshList();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { categories } = this.state;
    return (
      <>
        <Banner name="Nowa Kategoria" />
        <AdminDashboard />
        <div class="container">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
              <form>
                <div className="form-group">
                  <label>Nazwa Kategorii</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    onChange={this.handleChange}
                    value={this.state.Name}
                    placeholder="Podaj nazwe kategorii"
                  />
                </div>

                <Link
                  to={"/kategorie"}
                  className="btn btn-primary mt-3"
                  onClick={() =>
                    this.AddNewCategory().then(() => {
                      alert("Dodano kategorie");
                      this.refreshPage();
                    })
                  }
                >
                  Utwórz Kategorie
                </Link>

                <div class="col-sm-3"></div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminAddCategory;
