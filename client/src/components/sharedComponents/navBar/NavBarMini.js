/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../../../redux';
import { FiMenu, FiX } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { BiLogIn } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { RiRegisteredLine } from 'react-icons/ri';
import './navbarmini.scss';
import { connect } from 'react-redux';
import vileni from './vileni.png';
function NavBarMini({ userinfo, logoutdispatch }) {
  const [clickbrg, setClickbrg] = useState(false);
  const stateNav = userinfo === 'success';
  let history = useHistory();
  const logout = async () => {
    const wait = await logoutdispatch();
    if (wait) history.push('/login');
    else history.push('/login');
  };
  return (
    <>
      <div className="nav-bar">
        <div className="img-cnt" onClick={() => history.push('/')}>
          <img src={vileni} alt="vileni Logo" />
        </div>
        {clickbrg ? (
          <FiX className="hamburger-l" onClick={() => setClickbrg(!clickbrg)} />
        ) : (
          <FiMenu className="hamburger-l" onClick={() => setClickbrg(!clickbrg)} />
        )}
      </div>
      <div className={clickbrg ? 'over-burger clickbrg' : 'over-burger'}>
        <ul>
          {stateNav ? (
            <>
              <Link to="/mystats">
                <li>
                  <CgProfile className="logo-brg" />
                  MyStats
                </li>
              </Link>
              <a onClick={logout}>
                <li>
                  <BiLogIn className="logoout-brg" />
                  Log out
                </li>
              </a>
            </>
          ) : (
            <>
              <Link to="/login">
                <li>
                  <BiLogIn className="logo-brg" />
                  Log In
                </li>
              </Link>

              <Link to="/register">
                <li>
                  <RiRegisteredLine className="logo-brg" />
                  Sign Up
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    userinfo: state.user.user.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutdispatch: () => dispatch(logOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBarMini);
