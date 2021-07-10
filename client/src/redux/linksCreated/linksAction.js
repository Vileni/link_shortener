/* eslint-disable no-unused-vars */
import axios from 'axios';
import { FETCH_LINK_REQUEST, FETCH_LINK_SUCCESS } from './linksTypes';

export const fetchLinkRequest = () => {
  return {
    type: FETCH_LINK_REQUEST,
    payload: {},
  };
};
export const fetchLinksSuccess = Link => {
  return {
    type: FETCH_LINK_SUCCESS,
    payload: { ...Link },
  };
};

export const fetchLinks = () => {
  return async dispatch => {
    dispatch(fetchLinkRequest());

    const res = await axios.get('/api/v1/url/getallmyinfo');

    dispatch(
      fetchLinksSuccess({
        loading: false,
        Links: res.data.urls.linksCreated,
        Visited: res.data.urls.visited,
      })
    );
  };
};
