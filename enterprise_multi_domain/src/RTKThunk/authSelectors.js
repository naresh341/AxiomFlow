export const selectIsAuthenticated = (state) =>
  !!state.islogin.user || !!state.islogin.token;
export const selectUser = (state) => state.islogin.user;
export const selectAuthToken = (state) => state.islogin.token;
export const selectAuthStatus = (state) => state.islogin.status;
