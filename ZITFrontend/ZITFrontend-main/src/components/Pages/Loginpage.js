import React, { useState } from "react";
import Banner from "../Element/Banner";
import { fun2 } from "../loginFunction";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions/login";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  return (
    <>
      <Banner name="Logowanie" />
      <div class="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <p></p>
            <form
              onSubmit={(e) => {
                fun2(e, dispatch).then((data) => {
                  if (data === true) {
                    dispatch(logIn("user", "zweryfikowany", login));
                    history.push({
                      pathname: "/",
                      state: { registered: true },
                    });
                    navigate("/");
                    alert("Zalogowano pomyślnie");
                  }
                });
              }}
            >
              <div className="form-group">
                <label>Login</label>
                <input
                  type="text"
                  name="login"
                  className="form-control"
                  placeholder="Podaj login"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Hasło</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Podaj hasło"
                />
              </div>
              <p></p>
              <button type="submit" className="btn btn-primary btn-block">
                Zaloguj się
              </button>
              <div class="col-sm-3"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
