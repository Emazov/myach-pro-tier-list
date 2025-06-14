import { Link } from 'react-router-dom';

const Game = () => {
	return (
		<div className='game h-full'>
			<div className='container flex flex-col justify-between h-full'>
				<div></div>
				<div className='hero flex flex-col items-center'>
					<h2 className='text-[clamp(2rem,7vw,3rem)] text-center font-bold'>
						Game
					</h2>
				</div>
				<Link
					to='/guide'
					className='link_btn text-[#EC3381] border-2 text-[clamp(1rem,2vh,1.5rem)] py-[clamp(0.5rem,2vh,1rem)]'
				>
					Назад
				</Link>{' '}
			</div>
		</div>
	);
};

export default Game;
