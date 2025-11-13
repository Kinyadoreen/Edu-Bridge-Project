const { configureStore } = require('@reduxjs/toolkit');
const authReducer = require('./slices/authSlice').default;
const courseReducer = require('./slices/courseSlice').default;

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
});

module.exports = store;
