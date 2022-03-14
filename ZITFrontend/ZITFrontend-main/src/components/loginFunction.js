import axios from "axios";
import { variables } from "./../variables.js";
export async function fun2(e) {
  e.preventDefault();
  const login = e.target.login.value;
  const password = e.target.password.value;
  try {
    const response = await axios.post(variables.API_URL + "login", {
      Login: login,
      Password: password,
    });
    window.sessionStorage.setItem("token", response.data.access_token);
    window.sessionStorage.setItem("userIdfromToken", response.data.userId);
    window.sessionStorage.setItem("login", response.data.login);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    var ehh = String(err);
    if (ehh.includes("500")) {
      alert("Zostałeś zbanowany");
    } else {
      alert("Podaj prawidłowe dane logowania");
    }
    return false;
  }
}
