import React from 'react';
import Modal from '../index.jsx';
import {useForm} from 'react-hook-form';
import Button from '../../Button/index.jsx';
import ModalForm from '../ModalForm/index.jsx';
import {fetchRegister} from '../../../api/fetchRegister.js';

const RegisterModal = ({open, handleClose, handleOpenLogin}) => {
	const {register, handleSubmit} = useForm()

	const onSubmit = (data) => {
		fetchRegister(data).then(res => {
			if (res) {
				handleOpenLogin()
			}
		})
	}

	return (
		open ?
			<Modal close={handleClose}>
				<ModalForm type={'Регистрация'} onSubmit={handleSubmit(onSubmit)}>
					<label className={'formItem'}>
						Username
						<input type="text" {...register('username')}/>
					</label>
					<label className={'formItem'}>
						Password
						<input type="password" {...register('password')}/>
					</label>
					<Button>
						Войти
					</Button>
				</ModalForm>
			</Modal> :
			undefined
	);
};

export default RegisterModal;