/* eslint-disable no-unused-vars */
import axios from 'axios';
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_RELOAD, FETCH_USER_LOGOUT } from './userTypes';

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
    payload: {},
  };
};
export const fetchUsersSuccess = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { ...user },
  };
};

export const onReload = user => {
  return {
    type: FETCH_USER_RELOAD,
    payload: { ...user },
  };
};
export const logOut = () => {
  return async dispatch => {
    const res = await axios.get('/api/v1/user/logout');
    if (res) {
      dispatch({ type: FETCH_USER_LOGOUT });
    }
  };
};

export const userReload = () => {
  return async dispatch => {
    const user = await axios.get('/api/v1/user/me');
    dispatch(onReload({ loading: false, user: { ...user.data } }));
  };
};

export const fetchMe = (email, password) => {
  return async dispatch => {
    dispatch(fetchUserRequest());
    try {
      const res = await axios.post('/api/v1/user/login', {
        email,
        password,
      });
      dispatch(
        fetchUsersSuccess({
          loading: false,
          user: { ...res.data.data, status: 'success' },
        })
      );
    } catch (error) {
      console.log('error');
    }
  };
};

export const registerMe = (name, email, password, confirmPassword) => {
  return async dispatch => {
    dispatch(fetchUserRequest());
    if ((name, email, password, confirmPassword)) {
      try {
        const res = await axios.post('/api/v1/user/signup', {
          name,
          email,
          password,
          confirmPassword,
        });

        dispatch(
          fetchUsersSuccess({
            loading: false,
            user: { ...res.data.data, status: 'success' },
          })
        );
      } catch (error) {
        console.log('Error');
      }
    }
  };
};
