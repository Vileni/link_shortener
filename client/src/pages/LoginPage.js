import React from 'react';
import Login from '../components/login/Login';
import NavBar from '../components/sharedComponents/navBar/NavBar';
import Footer from '../components/sharedComponents/footer/Footer';
function LoginPage() {
  return (
    <>
      <NavBar />
      <Login />
      <Footer />
    </>
  );
}

export default LoginPage;
