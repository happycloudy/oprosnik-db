import React, {useContext, useState} from 'react';
import Button from '../Button/index.jsx';
import LoginModal from '../Modal/LoginModal/index.jsx';
import RegisterModal from '../Modal/RegisterModal/index.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

const Header = () => {
	const [open, setOpen] = useState(false);
	const {token, handleLogout, role, ...props} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleOpenLogin = () => setOpen('login');

	const handleOpenRegister = () => setOpen('register');

	const handleClose = () => setOpen(false);

	const _handleLogout = () => {
		handleLogout();
		navigate('/');
	};

	const navigateAdminPanel = () => navigate('/admin');

	const navigateMain = () => navigate('/');

	const navigatePassed = () => navigate('/passed');

	return (
		<div className={'centered'}>
			<LoginModal open={open === 'login'} handleClose={handleClose}/>
			<RegisterModal
				open={open === 'register'}
				handleClose={handleClose}
				handleOpenLogin={handleOpenLogin}
			/>
			<header
				className={
					'w-3/4 flex justify-between items-center border-2 border-lime-400 mt-3 rounded-full p-3 px-5'
				}
			>
				<Button onClick={navigateMain}>Опросы</Button>

				<div className={'flex gap-2'}>
					{token ? (
						<>
							{role === 'Admin' ? (
								<>
									<Button onClick={navigatePassed}>Пройденные опросы</Button>
									<Button onClick={navigateAdminPanel}>Админ панель</Button>
								</>
							) : undefined}
							<Button onClick={_handleLogout}> Выход </Button>
						</>
					) : (
						<>
							<Button onClick={handleOpenRegister}> Регистрация </Button>
							<Button onClick={handleOpenLogin}> Логин </Button>
						</>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
