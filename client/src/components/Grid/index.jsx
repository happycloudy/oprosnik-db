import React, {useEffect, useState} from 'react';
import Card from '../Card/index.jsx';
import {fetchSurveys} from '../../api/fetchSurveys.js';

const Grid = () => {
	const [surveys, setSurveys] = useState([])

	useEffect(() => {
		fetchSurveys().then(res => {
			setSurveys(res)
		})
	}, []);

	return (
		<div className={'flex flex-wrap gap-5 w-3/4'}>
			{
				surveys.map(item => (
					<Card key={item._id} name={item.name} questionsAmount={item.questions.length} id={item._id}/>
				))
			}
		</div>
	);
};

export default Grid;