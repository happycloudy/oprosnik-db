import React from 'react';
import { fetchCreateCategory } from '../../api/fetchCreateCategory.js';
import Button from '../Button/index.jsx';
import { useForm } from 'react-hook-form';

const AddCategory = ({ fetchCategories }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    fetchCreateCategory(data).then(() => {
      fetchCategories();
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={'formItem'}>
        Название категории
        <input className={'text-black'} type="text" {...register('name')} />
      </label>
      <div className={'mt-5'}>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
};

export default AddCategory;
