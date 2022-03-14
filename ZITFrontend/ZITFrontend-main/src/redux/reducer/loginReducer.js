export const loginReducer = (
  state = { role: "notLogged", verified: false, username: null },
  action
) => {
  switch (action.type) {
    case "SING_IN":
      return (state = {
        role: action.payload.role,
        verified: action.payload.verified,
        username: action.payload.username,
      });
    case "SING_OUT":
      return (state = {
        role: "notLogged",
        verified: false,
        username: null,
      });
    default:
      return state;
  }
};
