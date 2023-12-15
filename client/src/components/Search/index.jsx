import React, { useEffect, useState } from 'react';
import { fetchSurveys } from '../../api/fetchSurveys.js';
import { fetchSurveyByName } from '../../api/fetchSurveyByName.js';

const Index = ({ setSurveys, auth }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value) {
      fetchSurveyByName(value).then((res) => {
        setSurveys(res);
      });
    } else {
      if (auth) {
        fetchSurveys(auth).then((res) => {
          setSurveys(res);
        });
      }
    }
  }, [value, auth]);

  return (
    <div className={'centered mt-5'}>
      <input
        className={'w-3/4 h-10 p-3 rounded-xl text-black'}
        value={value}
        placeholder={'Поиск'}
        onChange={handleChange}
      />
    </div>
  );
};

export default Index;
