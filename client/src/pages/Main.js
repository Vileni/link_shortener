import React from 'react';
import NavBar from '../components/sharedComponents/navBar/NavBar';
import UrlShortener from '../components/shortener/UrlShortener';
import Footer from '../components/sharedComponents/footer/Footer';

function Main() {
  return (
    <>
      <NavBar />
      <UrlShortener />
      <Footer />
    </>
  );
}

export default Main;
