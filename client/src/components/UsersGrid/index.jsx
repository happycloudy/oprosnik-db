import React, { useEffect, useState } from 'react';
import { fetchSurveys } from '../../api/fetchSurveys.js';
import { fetchUsersSurveys } from '../../api/fetchUsersSurveys.js';

const UsersGrid = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersSurveys().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div className={'flex flex-wrap flex-col gap-7 w-3/4'}>
      {users.map((user) => (
        <div key={user._id} className={'flex flex-col gap-3'}>
          <h2 className={'font-bold text-2xl'}>{user.username}</h2>
          <div className={'flex flex-col'}>
            <h3 className={'text-bold text-xl'}>Ответы</h3>
            {user.items.map((survey, index) => (
              <div key={index} className={'mt-3'}>
                <h4 className={'italic'}>
                  <h5 className={'text-lg inline font-medium'}>Опрос:</h5>{' '}
                  {survey.name}, id=
                  {survey.id}
                </h4>
                {survey.answers.map((answer, index) => (
                  <div key={index}>
                    {index + 1}. {survey.questions[index].name}{' '}
                    <span className={'text-green-300'}>{answer}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersGrid;
