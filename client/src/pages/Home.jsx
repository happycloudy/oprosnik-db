import Grid from '../components/Grid/index.jsx';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import Header from '../components/Header/index.jsx';
import { fetchRemoveSurvey } from '../api/fetchRemoveSurvey.js';
import Search from '../components/Search/index.jsx';

const Home = () => {
  const [surveys, setSurveys] = useState([]);
  const { token: auth } = useContext(AuthContext);

  const handleRemoveSurvey = (e, id) => {
    e.stopPropagation();

    setSurveys((prev) => prev.filter((item) => item._id !== id));
    fetchRemoveSurvey(id);
  };
  return (
    <>
      <Header />
      <div className="centered mt-5">
        {auth ? (
          <div className={'flex flex-col gap-5 w-3/4'}>
            <Search setSurveys={setSurveys} auth={auth} />
            <Grid surveys={surveys} handleRemoveSurvey={handleRemoveSurvey} />
          </div>
        ) : (
          <div>Сначала войдите</div>
        )}
      </div>
    </>
  );
};

export default Home;
