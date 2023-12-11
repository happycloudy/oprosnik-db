import React, {useContext} from 'react';
import Modal from '../index.jsx';
import ModalForm from '../ModalForm/index.jsx';
import Button from '../../Button/index.jsx';
import {useForm} from 'react-hook-form';
import {fetchLogin} from '../../../api/fetchLogin.js';
import {AuthContext} from '../../../context/AuthContext.jsx';

const LoginModal = ({open, handleClose}) => {
	const {register, handleSubmit} = useForm();
	const {handleLogin} = useContext(AuthContext);

	const onSubmit = (data) => {
		fetchLogin(data).then((res) => {
			if (res.access_token) handleLogin(res.access_token, res.id, res.role);
			handleClose();
		});
	};

	return open ? (
		<Modal close={handleClose}>
			<ModalForm type={'Вход'} onSubmit={handleSubmit(onSubmit)}>
				<label className={'formItem'}>
					Username
					<input type="text" {...register('username')} />
				</label>
				<label className={'formItem'}>
					Password
					<input type="password" {...register('password')} />
				</label>
				<Button>Войти</Button>
			</ModalForm>
		</Modal>
	) : undefined;
};

export default LoginModal;