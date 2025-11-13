const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const axios = require('axios');

// Fetch courses from backend
const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/courses'); // adjust your backend URL
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

module.exports = {
  fetchCourses,
  default: coursesSlice.reducer
};
