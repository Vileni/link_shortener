import React from 'react';
import NavBar from '../components/sharedComponents/navBar/NavBar';
import Register from '../components/register/Register';
import Footer from '../components/sharedComponents/footer/Footer';
function RegisterPage() {
  return (
    <div>
      <NavBar />
      <Register />
      <Footer />
    </div>
  );
}

export default RegisterPage;
