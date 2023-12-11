import React from 'react';

const Button = ({children, ...props}) => {
	return (
		<button className={'p-2 px-3 border-2 rounded-xl hover:bg-white hover:text-black duration-150'} {...props}>
			{children}
		</button>
	);
};

export default Button;