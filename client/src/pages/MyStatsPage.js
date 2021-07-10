import React from 'react';
import NavBar from '../components/sharedComponents/navBar/NavBar';
import MyStats from '../components/mystats/MyStats';

function MyStatsPage() {
  return (
    <div>
      <NavBar />
      <MyStats />
      {/* <Footer /> */}
    </div>
  );
}

export default MyStatsPage;
