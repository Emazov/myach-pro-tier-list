import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api';
import { useUser } from './UserContext';
import type { Category, Player, UserVotingStats } from '../types/api';

interface GameContextProps {
	players: Player[];
	categories: Category[];
	currentPlayerIndex: number;
	categoriesState: Record<string, Player[]>;
	userStats: UserVotingStats | null;
	isLoading: boolean;
	error: string | null;
	handleCategorySelect: (categoryId: string) => void;
	remainingPlayers: number;
	isCompleted: boolean;
}

const GameContext = createContext<GameContextProps>({
	players: [],
	categories: [],
	currentPlayerIndex: 0,
	categoriesState: {},
	userStats: null,
	isLoading: false,
	error: null,
	handleCategorySelect: () => {},
	remainingPlayers: 0,
	isCompleted: false,
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user } = useUser();
	const [players, setPlayers] = useState<Player[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
	const [categoriesState, setCategoriesState] = useState<
		Record<string, Player[]>
	>({});
	const [userStats, setUserStats] = useState<UserVotingStats | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);

	// Загрузка категорий при монтировании
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				try {
					const data = await api.getCategories();
					console.log('Полученные категории:', data);

					if (data && Array.isArray(data) && data.length > 0) {
						setCategories(data);

						// Инициализация состояния категорий
						const initialCategoriesState: Record<string, Player[]> = {};
						data.forEach((category: Category) => {
							initialCategoriesState[category.id] = [];
						});
						setCategoriesState(initialCategoriesState);
					} else {
						console.warn('Категории не найдены, загружаем тестовые данные');
						// Используем тестовые категории
						const testCategories = [
							{ id: '1', name: 'goat', color: '#0EA94B', slots: 2 },
							{ id: '2', name: 'Хорош', color: '#94CC7A', slots: 6 },
							{ id: '3', name: 'норм', color: '#E6A324', slots: 6 },
							{ id: '4', name: 'Бездарь', color: '#E13826', slots: 6 },
						];

						setCategories(testCategories);

						// Инициализация состояния категорий
						const initialCategoriesState: Record<string, Player[]> = {};
						testCategories.forEach((category: Category) => {
							initialCategoriesState[category.id] = [];
						});
						setCategoriesState(initialCategoriesState);
					}
				} catch (err) {
					console.error('Ошибка при загрузке категорий:', err);
					// Используем тестовые категории в случае ошибки
					const testCategories = [
						{ id: '1', name: 'goat', color: '#0EA94B', slots: 2 },
						{ id: '2', name: 'Хорош', color: '#94CC7A', slots: 6 },
						{ id: '3', name: 'норм', color: '#E6A324', slots: 6 },
						{ id: '4', name: 'Бездарь', color: '#E13826', slots: 6 },
					];

					setCategories(testCategories);

					// Инициализация состояния категорий
					const initialCategoriesState: Record<string, Player[]> = {};
					testCategories.forEach((category: Category) => {
						initialCategoriesState[category.id] = [];
					});
					setCategoriesState(initialCategoriesState);
				}
			} catch (err) {
				console.error('Ошибка при инициализации категорий:', err);
				setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
			}
		};

		fetchCategories();
	}, []);

	// Загрузка игроков
	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				setIsLoading(true);
				if (!user) return;

				// Загрузка тестовых игроков, если на сервере нет данных
				try {
					const playersData = await api.getPlayersForVoting(user.id);
					console.log('Полученные игроки:', playersData);

					if (
						playersData &&
						Array.isArray(playersData) &&
						playersData.length > 0
					) {
						setPlayers(playersData);
					} else {
						console.warn('Игроки не найдены, загружаем тестовые данные');
						// Используем тестовые данные, если на сервере нет игроков
						setPlayers([
							{
								id: '1',
								name: 'Игрок 1',
								photoUrl: 'https://via.placeholder.com/300',
								releaseId: '1',
							},
							{
								id: '2',
								name: 'Игрок 2',
								photoUrl: 'https://via.placeholder.com/300',
								releaseId: '1',
							},
							{
								id: '3',
								name: 'Игрок 3',
								photoUrl: 'https://via.placeholder.com/300',
								releaseId: '1',
							},
						]);
					}

					// Загрузка статистики пользователя
					try {
						const statsData = await api.getUserVotingStats(user.id);
						setUserStats(statsData);

						if (
							statsData &&
							statsData.totalPlayers &&
							statsData.totalVoted === statsData.totalPlayers
						) {
							setIsCompleted(true);
						}
					} catch (statsErr) {
						console.error('Ошибка при загрузке статистики:', statsErr);
						// Используем заглушку для статистики
						setUserStats({
							totalVoted: 0,
							totalPlayers: 3,
							progress: 0,
							votesPerCategory: {},
						});
					}
				} catch (err) {
					console.error('Ошибка при загрузке игроков:', err);

					// Используем тестовые данные в случае ошибки
					console.warn('Загружаем тестовые данные из-за ошибки');
					setPlayers([
						{
							id: '1',
							name: 'Игрок 1',
							photoUrl: 'https://via.placeholder.com/300',
							releaseId: '1',
						},
						{
							id: '2',
							name: 'Игрок 2',
							photoUrl: 'https://via.placeholder.com/300',
							releaseId: '1',
						},
						{
							id: '3',
							name: 'Игрок 3',
							photoUrl: 'https://via.placeholder.com/300',
							releaseId: '1',
						},
					]);
					setUserStats({
						totalVoted: 0,
						totalPlayers: 3,
						progress: 0,
						votesPerCategory: {},
					});
				}
			} catch (err) {
				console.error('Ошибка при загрузке данных игры:', err);
				setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlayers();
	}, [user]);

	// Обработка выбора категории
	const handleCategorySelect = async (categoryId: string) => {
		try {
			console.log('Выбрана категория:', categoryId);

			if (!user) {
				console.error('Пользователь не авторизован');
				setError('Пользователь не авторизован');
				return;
			}

			if (currentPlayerIndex >= players.length) {
				console.error('Нет доступных игроков');
				setError('Нет доступных игроков');
				return;
			}

			const currentPlayer = players[currentPlayerIndex];
			console.log('Текущий игрок:', currentPlayer);

			// Проверка на наличие места в категории
			const category = categories.find((c) => c.id === categoryId);
			if (!category) {
				console.error('Категория не найдена:', categoryId);
				setError('Категория не найдена');
				return;
			}

			if (!category.slots) {
				console.error('У категории не указано количество мест:', category);
				setError(`У категории ${category.name} не указано количество мест`);
				return;
			}

			const currentCategoryPlayers = categoriesState[categoryId] || [];
			console.log(
				'Игроки в категории:',
				currentCategoryPlayers.length,
				'/',
				category.slots,
			);

			if (currentCategoryPlayers.length >= category.slots) {
				// Категория уже заполнена
				console.error('Категория заполнена:', category.name);
				setError(`Категория ${category.name} уже заполнена`);
				return;
			}

			try {
				// Отправка голоса на сервер
				console.log('Отправка голоса:', {
					telegramUserId: user.id,
					playerId: currentPlayer.id,
					categoryId: categoryId,
				});

				await api.addVote({
					telegramUserId: user.id,
					playerId: currentPlayer.id,
					categoryId: categoryId,
				});

				// Обновление локального состояния
				setCategoriesState((prev) => ({
					...prev,
					[categoryId]: [...prev[categoryId], currentPlayer],
				}));

				// Переход к следующему игроку
				setCurrentPlayerIndex((prev) => prev + 1);

				try {
					// Обновление статистики
					const updatedStats = await api.getUserVotingStats(user.id);
					console.log('Обновленная статистика:', updatedStats);
					setUserStats(updatedStats);

					if (
						currentPlayerIndex + 1 >= players.length ||
						(updatedStats &&
							updatedStats.totalPlayers &&
							updatedStats.totalVoted === updatedStats.totalPlayers)
					) {
						console.log('Голосование завершено');
						setIsCompleted(true);
					}
				} catch (statsErr) {
					console.error('Ошибка при обновлении статистики:', statsErr);
					// Продолжаем игру даже без статистики
				}
			} catch (voteErr) {
				console.error('Ошибка при отправке голоса:', voteErr);

				// В случае ошибки при голосовании, все равно переходим к следующему игроку
				// и обновляем локальное состояние (только для демонстрационных целей)
				setCategoriesState((prev) => ({
					...prev,
					[categoryId]: [...prev[categoryId], currentPlayer],
				}));
				setCurrentPlayerIndex((prev) => prev + 1);

				// Обновляем локальную статистику
				if (userStats) {
					setUserStats({
						...userStats,
						totalVoted: (userStats.totalVoted || 0) + 1,
						progress:
							((userStats.totalVoted || 0) + 1) /
							(userStats.totalPlayers || players.length),
					});
				}

				if (currentPlayerIndex + 1 >= players.length) {
					setIsCompleted(true);
				}
			}
		} catch (err) {
			console.error('Ошибка при обработке выбора категории:', err);
			setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
		}
	};

	// Расчет оставшихся игроков
	const remainingPlayers = players.length - currentPlayerIndex;

	return (
		<GameContext.Provider
			value={{
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
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => useContext(GameContext);

export default GameContext;
