export const logIn = (role, verified, username) => {
  return {
    type: "SING_IN",
    payload: { role, verified, username },
  };
};

export const logOut = () => {
  return {
    type: "SING_OUT",
  };
};
