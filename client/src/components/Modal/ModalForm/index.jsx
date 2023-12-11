import React from 'react';

const ModalForm = ({children, type, ...props}) => {
	return (
		<form className={'p-5 bg-white rounded-2xl text-black flex flex-col gap-7'} {...props}>
			<div className={'w-full text-2xl mb-3'}>
				{type}
			</div>
			{children}
		</form>
	);
};

export default ModalForm;