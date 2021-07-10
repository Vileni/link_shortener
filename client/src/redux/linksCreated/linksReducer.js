import { FETCH_LINK_REQUEST, FETCH_LINK_SUCCESS } from './linksTypes';

const initialState = {
  loading: false,
  links: [],
  visited: [],
};

const linksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LINK_REQUEST:
      return { ...state, loading: true };
    case FETCH_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        links: [...action.payload.Links],
        visited: [...action.payload.Visited],
      };

    default:
      return { ...state };
  }
};

export default linksReducer;
