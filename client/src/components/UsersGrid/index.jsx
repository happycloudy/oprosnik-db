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
            <h3 className={'text-bold text-lg'}>Опросы</h3>
            {user.items.map((survey, index) => (
              <div key={index} className={'mt-3'}>
                <h4 className={'italic'}>{survey.name}</h4>
                {survey.answers.map((answer, index) => (
                  <div key={index}>
                    {index + 1}. {answer}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        // <Card
        // 	key={item._id}
        // 	name={item.name}
        // 	questionsAmount={item.questions.length}
        // 	category={item.category?.name}
        // 	id={item._id}
        // />
      ))}
    </div>
  );
};

export default UsersGrid;
