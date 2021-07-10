/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMe } from '../../redux';
import './login.scss';
function Login({ fetchuser, userinfo }) {
  const history = useHistory();
  useEffect(() => {
    if (userinfo === 'success') {
      return history.push('/');
    }
  }, [userinfo]);
  const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        fetchuser(email, password);
      }}
    >
      <div className="in-cnt">
        <h2>Login</h2>
        <input
          onChange={e => Setemail(e.target.value)}
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Email"
        />
        <input
          onChange={e => Setpassword(e.target.value)}
          type="text"
          name="name"
          maxLength="50"
          placeholder="Enter Password"
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
