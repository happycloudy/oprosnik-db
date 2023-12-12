import React, {useContext} from 'react';
import Header from '../components/Header/index.jsx';
import UsersGrid from '../components/UsersGrid/index.jsx';
import {AuthContext} from '../context/AuthContext.jsx';

const PassedSurvey = () => {
	const {token: auth} = useContext(AuthContext);
	return (
		<>
			<Header/>
			<div className="centered mt-5">
				{auth ? <UsersGrid/> : <div>Сначала войдите</div>}
			</div>
		</>
	);
};

export default PassedSurvey;
