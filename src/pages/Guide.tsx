import { useState } from 'react';
import { Link } from 'react-router-dom';

const players = Array.from({ length: 20 }, (_, i) => i + 1);

const categories = [
	{ name: 'goat', color: '#0EA94B', slots: 2 },
	{ name: 'Хорош', color: '#94CC7A', slots: 6 },
	{ name: 'норм', color: '#E6A324', slots: 6 },
	{ name: 'Бездарь', color: '#E13826', slots: 6 },
];

const Guide = () => {
	const [nextStep, setNextStep] = useState(true);

	return (
		<div className='guide'>
			<div className='container'>
				<div className='hero'>
					{!nextStep && (
						<>
							<div className='guide_item'>
								<h2>Тебе покажем 20 игроков</h2>
								<div
									className='player_list'
									style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}
								>
									{players.map((num) => (
										<div className='player_item' key={`player-${num}`}>
											<p>{num}</p>
										</div>
									))}
								</div>
							</div>
							<div className='guide_item'>
								<h2>Разложи их по 4 категориям:</h2>
								<ul className='category_list' style={{ textAlign: 'center' }}>
									{categories.map((category) => (
										<li
											key={`category-${category.name}`}
											className='category_item'
											style={{
												backgroundColor: category.color,
												padding: '14px 16px',
											}}
										>
											<p>{category.name}</p>
										</li>
									))}
								</ul>
							</div>
						</>
					)}
					{nextStep && (
						<>
							<div className='guide_item'>
								<h2>У каждой категории ограниченное число мест</h2>
								<ul className='category_list'>
									{categories.map((category) => (
										<li
											key={`category-${category.name}`}
											className='category_item'
											style={{
												backgroundColor: category.color,
												display: 'grid',
												alignItems: 'center',
												gridTemplateColumns: 'auto 1fr',
												padding: '2px 4px 2px 16px',
												gap: '10px',
											}}
										>
											<p className='category_name'>{category.name}</p>
											<ul
												className='player_list'
												style={{
													gridTemplateColumns: `repeat(6, 1fr)`,
													alignItems: 'center',
												}}
											>
												{Array.from(
													{ length: category.slots },
													(_, i) => i + 1,
												).map((num) => (
													<li className='player_item' key={`slot-${num}`}>
														<p>{num}</p>
													</li>
												))}
											</ul>
										</li>
									))}
								</ul>
							</div>
							<div className='guide_item'>
								<h2>
									Если в категории нет места — можно заменить игрока или выбрать
									другую
								</h2>
							</div>
						</>
					)}
				</div>
				{!nextStep && (
					<button className='link_btn' onClick={() => setNextStep(true)}>
						Дальше
					</button>
				)}
				{nextStep && (
					<div className='guide_btns'>
						<button
							className='link_btn'
							style={{ background: 'none', color: '#EC3381' }}
							onClick={() => setNextStep(false)}
						>
							Назад
						</button>
						<Link to='/game' className='link_btn'>
							Начать игру
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Guide;
