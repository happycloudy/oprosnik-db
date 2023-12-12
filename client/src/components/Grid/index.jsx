import React, {useEffect, useState} from 'react';
import Card from '../Card/index.jsx';
import {fetchSurveys} from '../../api/fetchSurveys.js';
import {fetchRemoveSurvey} from '../../api/fetchRemoveSurvey.js';

const Grid = () => {
	const [surveys, setSurveys] = useState([]);

	useEffect(() => {
		fetchSurveys().then((res) => {
			setSurveys(res);
		});
	}, []);

	const handleRemoveSurvey = (e, id) => {
		e.stopPropagation();

		setSurveys((prev) => prev.filter((item) => item._id !== id));
		fetchRemoveSurvey(id);
	};

	return (
		<div className={'flex flex-wrap gap-5 w-3/4'}>
			{surveys.map((item) => (
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
