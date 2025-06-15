const categories = [
	{ name: 'goat', color: '#0EA94B', slots: 2 },
	{ name: 'Хорош', color: '#94CC7A', slots: 6 },
	{ name: 'норм', color: '#E6A324', slots: 6 },
	{ name: 'Бездарь', color: '#E13826', slots: 6 },
];

const Game = () => {
	return (
		<div className='game h-full'>
			<div className='container flex flex-col justify-between h-full'>
				<div className='hero flex flex-col gap-[clamp(1rem,2vh,2rem)] items-center h-full'>
					<div className='progress_bar w-full py-1.5 rounded-lg bg-[linear-gradient(90deg,_#EC3381_10%,_#FFEC13_100%)]'></div>

					<div className='player_item flex flex-col items-center gap-3'>
						<img
							src='/club_logo.jpg'
							alt='club_logo'
							className='w-[clamp(2rem,20vw,4rem)]'
						/>
						<h3 className='text-[clamp(1rem,4vh,1.3rem)] uppercase'>х. кейн</h3>
						<img
							src='/kane.jpg'
							alt='player'
							className='w-[clamp(1rem,45vmin,20rem)]'
						></img>
					</div>
				</div>
				<div className='category w-full'>
					<h3 className='text-[clamp(1rem,4vh,1.2rem)] text-center mb-4'>
						Выбери один из категорий для данного игрока
					</h3>
					<ul className='category_list text-center flex flex-col gap-3'>
						{categories.map((category) => (
							<li
								key={`category-${category.name}`}
								className='category_item flex items-center justify-center gap-4 text-[clamp(1rem,4vh,1.7rem)] font-bold rounded-lg text-white uppercase py-[clamp(0.5rem,1vh,1.5rem)]'
								style={{
									backgroundColor: category.color,
								}}
							>
								<p>{category.name}</p>
								<p className='font-normal'>0 / {category.slots}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Game;
