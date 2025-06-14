import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<div className='welcome bg-[url("./main_bg.jpg")] bg-cover bg-center h-full'>
			<div className='container flex flex-col justify-between h-full'>
				<div></div>
				<div className='hero flex flex-col items-center'>
					<h2 className='text-white text-[clamp(2.5rem,9vw,3.5rem)] text-center font-bold'>
						Добро пожаловать!
					</h2>

					<img src='./main_logo.png' alt='logo' className='logo' />
				</div>

				<Link
					to='/guide'
					className='link_btn bg-[#FFEC13] text-[clamp(1rem,2vh,1.5rem)] text-black py-[clamp(1rem,1vh,2rem)]'
				>
					Поехали!
				</Link>
			</div>
		</div>
	);
};

export default Welcome;
