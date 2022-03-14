import { variables } from "./../variables.js";

export async function fun1(e) {
  e.preventDefault();
  let firstName = e.target.firstName.value;
  let lastName = e.target.lastName.value;
  let password = e.target.password1.value;
  let Login = e.target.Login.value;
  let City = e.target.City.value;
  let BirthDate = e.target.BirthDate.value;
  let Email = e.target.Email.value;

  const res = await fetch(variables.API_URL + "login/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      FirstName: firstName,
      LastName: lastName,
      Login: Login,
      Password: password,
      Role: "User",
      City: City,
      AdditionalInformation: "none",
      BirthDate: BirthDate,
      Email: Email,
    }),
  });
  return res;
}
