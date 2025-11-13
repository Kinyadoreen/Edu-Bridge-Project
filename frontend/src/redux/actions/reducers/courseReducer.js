const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COURSES_REQUEST':
      return { ...state, loading: true };
    case 'COURSES_SUCCESS':
      return { ...state, loading: false, courses: action.payload };
    case 'COURSES_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

module.exports = { courseReducer };
