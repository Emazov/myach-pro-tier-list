import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div className='welcome'>
			<div className='container'>
				<div className='hero'>
					<h2>Добро пожаловать!</h2>

					<img src='./main_logo.png' alt='logo' className='logo' />
				</div>

				<Link to='/guide' className='link_btn'>
					Поехали!
				</Link>
			</div>
		</div>
	);
};

export default Welcome;
