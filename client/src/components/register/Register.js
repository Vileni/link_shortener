import React, { useState, useEffect } from 'react';
import './register.scss';
import validator from 'validator';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerMe } from '../../redux';

function Register({ signUp, userinfo }) {
  const history = useHistory();
  const [errName, SetErrName] = useState(false);

  const [errMail, SetErrMail] = useState(false);
  const [errPassword, SetErrPassword] = useState(false);
  const [errConfirm, SetErrConfirm] = useState(false);

  useEffect(() => {
    if (userinfo === 'success') {
      return history.push('/');
    }
  }, [history, userinfo]);

  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const [passwordConfirm, SetpasswordConfirm] = useState('');
  const handleRegister = e => {
    e.preventDefault();
    if (email.length < 5 || !validator.isEmail(email)) {
      SetErrMail(true);
    } else {
      SetErrMail(false);
    }
    if (name.length < 2) {
      SetErrName(true);
    } else {
      SetErrName(false);
    }
    if (password.length < 2) {
      SetErrPassword(true);
    } else {
      SetErrPassword(false);
    }
    if (passwordConfirm.length < 2 || passwordConfirm !== password) {
      SetErrConfirm(true);
    } else {
      SetErrConfirm(false);
    }
    if (!errName && !errMail && !errPassword && !errConfirm) {
      signUp(name, email, password, passwordConfirm);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="in-cnt">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          maxLength="25"
          placeholder="Enter Name"
          onChange={e => Setname(e.target.value)}
          style={{ borderColor: errName ? 'red' : '' }}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Email"
          onChange={e => Setemail(e.target.value)}
          style={{ borderColor: errMail ? 'red' : '' }}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Password"
          onChange={e => Setpassword(e.target.value)}
          style={{ borderColor: errPassword ? 'red' : '' }}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Confirm Password"
          onChange={e => SetpasswordConfirm(e.target.value)}
          style={{ borderColor: errConfirm ? 'red' : '' }}
        />

        <button>Register</button>
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
    signUp: (name, email, password, passwordConfirm) => dispatch(registerMe(name, email, password, passwordConfirm)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
