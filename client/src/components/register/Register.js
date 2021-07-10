import React, { useState, useEffect } from 'react';
import './register.scss';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerMe } from '../../redux';
function Register({ signUp, userinfo }) {
  const history = useHistory();
  useEffect(() => {
    if (userinfo === 'success') {
      return history.push('/');
    }
  }, [history, userinfo]);

  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const [passwordConfirm, SetpasswordConfirm] = useState('');

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        signUp(name, email, password, passwordConfirm);
      }}
    >
      <div className="in-cnt">
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          maxLength="25"
          placeholder="Enter Name"
          onChange={e => Setname(e.target.value)}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Email"
          onChange={e => Setemail(e.target.value)}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Password"
          onChange={e => Setpassword(e.target.value)}
        />
        <input
          type="text"
          name="name"
          maxLength="50"
          placeholder="Confirm Password"
          onChange={e => SetpasswordConfirm(e.target.value)}
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
