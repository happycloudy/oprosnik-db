import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchSurveyData} from '../api/fetchSurveyData.js';
import SurveyForm from '../components/SurveyForm/index.jsx';
import Header from '../components/Header/index.jsx';

const Survey = () => {
	const [survey, setSurvey] = useState(undefined);
	const params = useParams();

	useEffect(() => {
		fetchSurveyData(params.id).then((res) => {
			setSurvey(res);
		});
	}, []);

	return (
		<>
			<Header/>
			<div className={'centered mt-5'}>
				{survey ? (
					<div className={'w-3/4 centered flex-col gap-3'}>
						<div className={'font-bold text-xl'}>{survey.name}</div>
						<SurveyForm questions={survey.questions} id={survey._id}/>
					</div>
				) : (
					<div className={'text-red-600'}>Такого опроса нету</div>
				)}
			</div>
		</>
	);
};

export default Survey;