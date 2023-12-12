import React from 'react';
import Button from '../Button/index.jsx';
import { fetchRemoveCategory } from '../../api/fetchRemoveCategory.js';

const Categories = ({ categories, setCategories }) => {
  const handleRemove = (id) => {
    fetchRemoveCategory(id).then((res) => {
      setCategories((prev) => prev.filter((category) => category._id !== id));
    });
  };

  return (
    <div className={'flex gap-3 flex-wrap'}>
      {categories.map((category) => (
        <div
          key={category._id}
          className={
            'p-3 bg-green-500 rounded-md flex flex-col justify-center items-center gap-3'
          }
        >
          <h3>{category.name}</h3>
          <Button onClick={() => handleRemove(category._id)}>Удалить</Button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
