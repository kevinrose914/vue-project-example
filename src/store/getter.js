const getters = {
  token: state => state.user.token,
  loggedIn: state => state.user.isLoggedIn,
};

export default getters;
