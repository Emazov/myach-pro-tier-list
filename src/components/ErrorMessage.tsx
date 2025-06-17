import React, { useState, useEffect } from 'react';

interface ErrorMessageProps {
	message: string | null;
	onClose?: () => void;
	autoCloseTime?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onClose,
	autoCloseTime = 5000,
}) => {
	const [visible, setVisible] = useState(!!message);

	useEffect(() => {
		setVisible(!!message);

		if (message && autoCloseTime > 0) {
			const timer = setTimeout(() => {
				setVisible(false);
				if (onClose) onClose();
			}, autoCloseTime);

			return () => clearTimeout(timer);
		}
	}, [message, autoCloseTime, onClose]);

	if (!visible || !message) return null;

	return (
		<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-red-600 text-white p-4 rounded-lg shadow-lg z-50'>
			<div className='flex justify-between items-center'>
				<p>{message}</p>
				<button
					className='ml-4 text-white'
					onClick={() => {
						setVisible(false);
						if (onClose) onClose();
					}}
				>
					✕
				</button>
			</div>
		</div>
	);
};

export default ErrorMessage;
