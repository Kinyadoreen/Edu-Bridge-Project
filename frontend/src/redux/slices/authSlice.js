const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    }
  }
});

const { login, logout } = authSlice.actions;

module.exports = {
  login,
  logout,
  default: authSlice.reducer
};
