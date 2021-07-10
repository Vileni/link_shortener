/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/';
import './navbardesktop.scss';
import vileni from './vileni.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiLogIn } from 'react-icons/bi';
import { RiRegisteredLine } from 'react-icons/ri';
function NavBarDesktop({ userinfo, logoutdispatch }) {
  const stateNav = userinfo === 'success';
  let history = useHistory();
  const logout = async () => {
    const wait = await logoutdispatch();
    if (wait) history.push('/login');
    else history.push('/login');
  };

  return (
    <div className="nav-bar">
      <div className="img-cnt" onClick={() => history.push('/')}>
        <img src={vileni} alt="vileni Logo" />
      </div>
      <div>
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
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(NavBarDesktop);
