import React, { useEffect, useState } from 'react';
import Header from '../components/Header/index.jsx';
import AddSurveyForm from '../components/AddSurveyForm/index.jsx';
import AddCategory from '../components/AddCategory/index.jsx';
import { fetchCategories } from '../api/fetchCategories.js';
import Categories from '../components/Categories/index.jsx';

const Admin = () => {
  const [categories, setCategories] = useState([]);

  const handleFetchCategories = () => {
    fetchCategories().then((res) => {
      setCategories(res);
    });
  };

  useEffect(handleFetchCategories, []);

  return (
    <>
      <Header />
      <div className={'centered'}>
        <div className={'w-3/4 mt-5'}>
          <h2 className={'text-xl'}>Создание категории</h2>
          <AddCategory fetchCategories={handleFetchCategories} />

          <div className={'mt-10'}></div>

          <h2 className={'text-xl'}>Категории</h2>
          <Categories categories={categories} setCategories={setCategories} />

          <div className={'mt-10'}></div>

          <h2 className={'text-xl'}>Добавление опросов</h2>
          <AddSurveyForm categories={categories} />
        </div>
      </div>
    </>
  );
};

export default Admin;
