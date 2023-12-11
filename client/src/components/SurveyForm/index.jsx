import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import Button from '../Button/index.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import {submitSurvey} from '../../api/submitSurvey.js';
import {useNavigate} from 'react-router-dom';

const SurveyForm = ({questions, id}) => {
	const {register, handleSubmit} = useForm();
	const {id: userId} = useContext(AuthContext);
	const navigate = useNavigate()

	const onSubmit = (data) => {
		const result = questions.map((question) => data[question.name]);
		submitSurvey(userId, id, result).then(() => {
			navigate('/')
		});
	};

	return (
		<form className={'w-full mt-5'} onSubmit={handleSubmit(onSubmit)}>
			{questions.map((question) => (
				<label className={'formItem'} key={question.name}>
					{question.name}
					<select
						{...register(question.name, {required: true})}
						className={'text-black w-1/2'}
					>
						{question.variants.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</label>
			))}

			<div className={'mt-5'}>
				<Button>Завершить</Button>
			</div>
		</form>
	);
};

export default SurveyForm;