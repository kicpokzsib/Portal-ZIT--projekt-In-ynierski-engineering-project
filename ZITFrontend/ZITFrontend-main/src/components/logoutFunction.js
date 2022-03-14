import axios from "axios";
import { variables } from "./../variables.js";
export async function fun3() {
  const response = await axios.post(variables.API_URL + "login/logout", {
    Login: "login",
    Password: "password",
  });
  if (response.status === 200) {
    window.sessionStorage.setItem("token", response.data.access_token);
    return true;
  } else {
    return false;
  }
}
