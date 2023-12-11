import React from 'react';
import {createPortal} from 'react-dom';

const ModalWrap = ({children}) => {
	return (
		<div className={'absolute left-0 top-0 w-screen h-screen centered bg-black/75'}>
			{children}
		</div>
	);
};

const Modal = ({children, close}) => {
	return createPortal(
		<ModalWrap>
			<button className={' absolute right-1 top-1 h-10 w-10 bg-green-500 rounded-full'} onClick={close}>
				X
			</button>
			{children}
		</ModalWrap>,
		document.body
	)
}

export default Modal;