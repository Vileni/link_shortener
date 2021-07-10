/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { userReload } from '../../../redux/';
import NavBarMini from './NavBarMini';
import NavBarDesktop from './NavBarDesktop';
import { useMediaQuery } from 'react-responsive';

function NavBar({ reLoad, userinfo }) {
  const mobile = useMediaQuery({ maxWidth: 966 });

  useEffect(() => {
    if (false) {
    } else {
      reLoad();
    }
  }, []);
  if (mobile) {
    return <NavBarMini />;
  } else {
    return <NavBarDesktop />;
  }
}

const mapStateToProps = state => {
  return {
    userinfo: state.user.user.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reLoad: () => dispatch(userReload()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
