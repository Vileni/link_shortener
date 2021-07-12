import React from 'react';
import './errorlink.scss';
import NavBar from './../sharedComponents/navBar/NavBar';
import Footer from './../sharedComponents/footer/Footer';
function ErrorLink() {
  return (
    <>
      <NavBar />
      <div className="error-cnt">
        <h1> Bad link! Something went wrong!</h1>
      </div>
      <Footer />
    </>
  );
}

export default ErrorLink;
