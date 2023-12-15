import React from 'react';
import Card from '../Card/index.jsx';

const Grid = ({ surveys, handleRemoveSurvey }) => {
  return (
    <div className={'flex flex-wrap gap-5 w-3/4'}>
      {surveys?.map((item) => (
        <Card
          key={item._id}
          name={item.name}
          questionsAmount={item.questions.length}
          category={item.category?.name}
          id={item._id}
          handleRemove={handleRemoveSurvey}
        />
      ))}
    </div>
  );
};

export default Grid;
