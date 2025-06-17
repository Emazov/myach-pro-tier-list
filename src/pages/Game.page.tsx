import { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import ErrorMessage from '../components/ErrorMessage';

const Game = () => {
	const {
		players,
		categories,
		currentPlayerIndex,
		categoriesState,
		userStats,
		isLoading,
		error,
		handleCategorySelect,
		remainingPlayers,
		isCompleted,
	} = useGame();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Рассчитываем прогресс: сколько уже обработано от общего числа
	const progress = userStats ? userStats.progress * 100 : 0;

	// Получаем текущего игрока
	const currentPlayer = players[currentPlayerIndex];

	// Обработка ошибок
	useEffect(() => {
		if (error) {
			setErrorMessage(error);
		}
	}, [error]);

	if (isLoading) {
		return (
			<div className='game h-full flex items-center justify-center'>
				<div className='container text-center'>
					<h2 className='text-[clamp(1.5rem,4vh,2rem)] font-bold'>
						Загрузка...
					</h2>
				</div>
			</div>
		);
	}

	if (isCompleted || !currentPlayer) {
		return (
			<div className='game h-full flex items-center justify-center'>
				<div className='container text-center'>
					<h2 className='text-[clamp(1.5rem,4vh,2rem)] font-bold'>
						Тир-лист завершён 🎉
					</h2>
					{userStats && (
						<p className='mt-4'>
							Вы проголосовали за {userStats.totalVoted} из{' '}
							{userStats.totalPlayers} игроков
						</p>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className='game h-full'>
			<div className='container flex flex-col justify-between h-full'>
				<div className='w-full h-2 bg-gray-300 rounded-lg overflow-hidden mb-6'>
					<div
						className='h-full bg-[linear-gradient(90deg,_#EC3381_10%,_#FFEC13_100%)]'
						style={{ width: `${progress}%` }}
					/>
				</div>
				<div className='hero flex flex-col items-center gap-6 h-full pt-6'>
					{currentPlayer.photoUrl ? (
						<img
							src={currentPlayer.photoUrl}
							alt={currentPlayer.name}
							className='w-[clamp(1rem,45vmin,20rem)] rounded-xl shadow-md'
						/>
					) : (
						<div className='w-[clamp(1rem,45vmin,20rem)] h-[clamp(1rem,45vmin,20rem)] bg-gray-200 rounded-xl flex items-center justify-center'>
							<span className='text-gray-500'>Нет фото</span>
						</div>
					)}
					<h3 className='text-[clamp(1rem,4vh,1.3rem)] uppercase font-semibold'>
						{currentPlayer.name}
					</h3>

					<h4 className='text-[clamp(1rem,4vh,1.2rem)] text-center mt-4'>
						Выбери категорию
					</h4>

					<ul className='category_list text-center flex flex-col gap-3 w-full px-4'>
						{categories.map((category) => (
							<li
								key={category.id}
								className='category_item flex items-center justify-center gap-4 text-[clamp(1rem,4vh,1.7rem)] font-bold rounded-lg text-white uppercase py-[clamp(0.5rem,1vh,1.5rem)] cursor-pointer'
								style={{ backgroundColor: category.color || '#333' }}
								onClick={() => handleCategorySelect(category.id)}
							>
								<p>{category.name}</p>
								<p className='font-normal'>
									{categoriesState[category.id]?.length || 0} /{' '}
									{category.slots || 0}
								</p>
							</li>
						))}
					</ul>
				</div>

				<div className='py-4 text-center'>
					<p>Осталось игроков: {remainingPlayers}</p>
				</div>
			</div>

			{/* Компонент для отображения ошибок */}
			<ErrorMessage
				message={errorMessage}
				onClose={() => setErrorMessage(null)}
			/>
		</div>
	);
};

export default Game;
