import React from 'react';
import {getEnd} from '../../utils/getEnd.js';
import {useNavigate} from 'react-router-dom';

const Card = ({name, questionsAmount, id}) => {
	const navigate = useNavigate()

	const handleClickSurvey = () => navigate(`survey/${id}`)

	return (
		<div onClick={handleClickSurvey}
				 className={'bg-green-900 flex flex-col p-3 rounded-md hover:bg-white hover:text-black cursor-pointer duration-150 select-none'}>
			<h2 className={'font-bold'}>
				{name}
			</h2>
			<div>
				{questionsAmount} вопрос{getEnd(questionsAmount)}
			</div>
		</div>
	);
};

export default Card;