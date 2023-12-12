import React, {useContext} from 'react';
import {getEnd} from '../../utils/getEnd.js';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import Button from '../Button/index.jsx';

const Card = ({name, questionsAmount, id, handleRemove, category}) => {
	const navigate = useNavigate();
	const {role} = useContext(AuthContext);

	const handleClickSurvey = () => navigate(`survey/${id}`);

	return (
		<div
			onClick={handleClickSurvey}
			className={
				'bg-green-900 flex flex-col p-3 rounded-md hover:bg-white hover:text-black cursor-pointer duration-150 select-none'
			}
		>
			<h2 className={'font-bold'}>{name}</h2>
			<div>
				{questionsAmount} вопрос{getEnd(questionsAmount)}, {category}
			</div>
			{role === 'Admin' ? (
				<Button onClick={(e) => handleRemove(e, id)}>Удалить</Button>
			) : undefined}
		</div>
	);
};

export default Card;
