import React, { useState } from "react";
import Banner from "../Element/Banner";
import { fun1 } from "../registerFunction";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isValid2, setIsValid2] = useState(false);
  const [isValid3, setIsValid3] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const passRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;

  const maxData = new Date().toISOString().split("T")[0];

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("Poprawny email");
    } else {
      setIsValid(false);
      setMessage("Podaj prawidłowy adres email");
    }
  };

  const validateDate = (event) => {
    const date = event.target.value;
    if (dateRegex.test(date)) {
      setIsValid2(true);
      setMessage2("Poprawna data");
    } else {
      setIsValid2(false);
      setMessage2("Podaj prawidłową datę urodzenia");
    }
  };

  const validatePassword = (event) => {
    const password = event.target.value;
    if (passRegex.test(password)) {
      setIsValid3(true);
      setMessage3("Hasło poprawne");
    } else {
      setIsValid3(false);
      setMessage3("Minimum 8 znaków, 1 cyfra");
    }
  };

  const validateResponse = (res) => {
    if (res.ok) {
      // if (postData.data.Status === "Success") {
      navigate("/");
      alert("Konto utworzone poprawnie");
      return true;
      // }
    } else {
      alert("Błąd podczas tworzenia konta - Login zajęty");
    }
  };
  var checkMe = "disabled";
  var checkMe2 = "";
  if (isValid === true && isValid2 === true && isValid3 === true) {
    checkMe = checkMe2;
  }

  return (
    <>
      <Banner name="Rejestracja" />
      <div class="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <p></p>
            <form
              onSubmit={async (e) => {
                fun1(e).then((res) => {
                  validateResponse(res);
                });
              }}
            >
              <div className="form-group">
                <label>Imię</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="Podaj Imię"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="form-group">
                <label>Nazwisko</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Podaj Nazwisko"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="form-group">
                <label>Login</label>
                <input
                  type="text"
                  name="Login"
                  className="form-control"
                  placeholder="Podaj login"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="form-group">
                <label>Miasto</label>
                <input
                  type="text"
                  name="City"
                  className="form-control"
                  placeholder="Podaj miasto"
                  required
                  minLength={3}
                  maxLength={20}
                />
              </div>

              <div className="form-group">
                <label>Data Urodzenia</label>
                <input
                  type="date"
                  min="1900-01-01"
                  max={maxData}
                  name="BirthDate"
                  className="form-control"
                  placeholder="Rok-Dzień-Miesiąc"
                  required
                  onChange={validateDate}
                />
                <div className={`message2 ${isValid2 ? "success" : "error"}`}>
                  {message2}
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  className="form-control"
                  placeholder="Podaj swój adres e-mail"
                  required
                  onChange={validateEmail}
                />
                <div className={`message ${isValid ? "success" : "error"}`}>
                  {message}
                </div>
              </div>

              <div className="form-group">
                <label>Hasło</label>
                <input
                  type="password"
                  name="password1"
                  className="form-control"
                  placeholder="Podaj hasło"
                  required
                  onChange={validatePassword}
                />
                <div className={`message3 ${isValid3 ? "success" : "error"}`}>
                  {message3}
                </div>
              </div>
              <p></p>
              <button
                disabled={String(checkMe)}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Zarejestruj się
              </button>
              <div class="col-sm-3"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
