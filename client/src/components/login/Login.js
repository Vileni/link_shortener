/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

import { connect } from 'react-redux';
import { fetchMe } from '../../redux';
import './login.scss';
function Login({ fetchuser, userinfo }) {
  const history = useHistory();
  const [errMail, SetErrMail] = useState(false);
  const [errPassword, SetErrPassword] = useState(false);

  useEffect(() => {
    if (userinfo === 'success') {
      return history.push('/');
    }
  }, [userinfo]);
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    if (email.length < 5 || !validator.isEmail(email)) {
      SetErrMail(true);
    } else {
      SetErrMail(false);
    }
    if (password.length < 2) {
      SetErrPassword(true);
    } else {
      SetErrPassword(false);
    }
    if (email.length > 5 && password.length > 2) {
      fetchuser(email, password);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="in-cnt">
        <h2>Login</h2>
        <input
          onChange={e => Setemail(e.target.value)}
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Email"
          style={{ borderColor: errMail ? 'red' : '' }}
        />
        <input
          onChange={e => Setpassword(e.target.value)}
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Password"
          style={{ borderColor: errPassword ? 'red' : '' }}
        />
        <button>Login</button>
      </div>
    </form>
  );
}
const mapStateToProps = state => {
  return {
    userinfo: state.user.user.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchuser: (email, password) => dispatch(fetchMe(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
