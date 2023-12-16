import React, { useState } from 'react';
import Button from '../Button/index.jsx';
import { fetchCreateSurvey } from '../../api/fetchCreateSurvey.js';

const nullishCategory = {
  name: 'Не выбрано',
  _id: '',
};

const AddSurveyForm = ({ categories }) => {
  const [name, setName] = useState('Начальное название опроса');
  const [category, setCategory] = useState(nullishCategory._id);
  const [items, setItems] = useState([]);

  const handleCategory = (e) => setCategory(e.target.value);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: `Вопрос ${prev.length + 1}`,
        variants: ['Ответ 1'],
      },
    ]);
  };

  const handleAddAnswer = (id) => {
    setItems((prev) =>
      prev.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            variants: [
              ...question.variants,
              `Ответ ${question.variants.length + 1}`,
            ],
          };
        }
        return question;
      }),
    );
  };

  const handleChangeQuestion = (e, questionId) => {
    setItems((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          return { ...question, name: e.target.value };
        } else {
          return question;
        }
      }),
    );
  };

  const handleChangeAnswer = (e, questionId, i) => {
    setItems((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            variants: question.variants.map((answer, index) => {
              if (index === i) {
                return e.target.value;
              } else {
                return answer;
              }
            }),
          };
        } else {
          return question;
        }
      }),
    );
  };

  const handleRemoveLastAnswer = (questionId) => {
    setItems((prev) =>
      prev.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            variants: question.variants.slice(0, question.variants.length - 1),
          };
        } else {
          return question;
        }
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      name,
      questions: items,
    };

    if (category) body.categoryId = category;

    fetchCreateSurvey(body).then((res) => {
      setName('Начальное название опроса');
      setItems([]);
    });
  };

  return (
    <form onSubmit={onSubmit} className={'mt-5'}>
      <label className={'formItem text-black'}>
        <h3 className={'text-white'}>Название опроса</h3>

        <input
          type="text"
          className={'text-black'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className={'formItem text-black mt-3'}>
        <h3 className={'text-white'}>Категория</h3>
        <select onChange={handleCategory}>
          {[nullishCategory, ...categories].map((categoryItem) => (
            <option key={categoryItem._id} value={categoryItem._id}>
              {categoryItem.name}
            </option>
          ))}
        </select>
      </label>

      {items.map((item) => (
        <label
          key={item.id}
          className={'formItem border-y-green-300 border-y-2 py-3 mt-4'}
        >
          <label className={'formItem'}>
            Вопрос
            <input
              className={'text-black'}
              value={item.name}
              type="text"
              onChange={(e) => handleChangeQuestion(e, item.id)}
            />
          </label>

          <h4 className={'mt-2'}>Ответы</h4>
          {item.variants.map((answer, i) => (
            <input
              key={i}
              className={'text-black'}
              type="text"
              value={answer}
              onChange={(e) => handleChangeAnswer(e, item.id, i)}
            />
          ))}
          <div className={'mt-5 flex justify-between'}>
            <Button type={'button'} onClick={() => handleAddAnswer(item.id)}>
              Добавить ответ
            </Button>
            <Button
              type={'button'}
              onClick={() => handleRemoveLastAnswer(item.id)}
            >
              Удалить последний ответ
            </Button>
          </div>
        </label>
      ))}

      <div className={'mt-5 flex justify-between pt-3'}>
        <Button type={'button'} onClick={handleAddItem}>
          Добавить вопрос
        </Button>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
};

export default AddSurveyForm;
