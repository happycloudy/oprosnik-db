// login, register - modal,
// surveys

import Grid from '../components/Grid/index.jsx';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Header from '../components/Header/index.jsx';

const Home = () => {
  const { token: auth } = useContext(AuthContext);
  return (
    <>
      <Header />
      <div className="centered mt-5">
        {auth ? <Grid /> : <div>Сначала войдите</div>}
      </div>
    </>
  );
};

export default Home;
