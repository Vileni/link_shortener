import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_RELOAD, FETCH_USER_LOGOUT } from './userTypes';

const initialState = {
  loading: false,
  user: {
    status: 'logout',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };

    case FETCH_USER_SUCCESS:
      const s = {
        ...state,
        loading: false,
        user: { ...action.payload.user },
      };
      return s;
    case FETCH_USER_RELOAD:
      return {
        ...state,
        loading: false,
        user: { ...action.payload.user },
      };
    case FETCH_USER_LOGOUT:
      return {
        ...state,
        loading: false,
        user: { status: 'logout' },
      };

    default:
      return { ...state };
  }
};

export default userReducer;
