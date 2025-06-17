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
				const data = await api.getCategories();
				setCategories(data);

				// Инициализация состояния категорий
				const initialCategoriesState: Record<string, Player[]> = {};
				data.forEach((category: Category) => {
					initialCategoriesState[category.id] = [];
				});
				setCategoriesState(initialCategoriesState);
			} catch (err) {
				console.error('Ошибка при загрузке категорий:', err);
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

				const playersData = await api.getPlayersForVoting();
				setPlayers(playersData);

				// Загрузка статистики пользователя
				const statsData = await api.getUserVotingStats(user.id);
				setUserStats(statsData);

				if (statsData.totalVoted === statsData.totalPlayers) {
					setIsCompleted(true);
				}
			} catch (err) {
				console.error('Ошибка при загрузке игроков:', err);
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
			if (!user || currentPlayerIndex >= players.length) return;

			const currentPlayer = players[currentPlayerIndex];

			// Проверка на наличие места в категории
			const category = categories.find((c) => c.id === categoryId);
			if (!category?.slots) return;

			const currentCategoryPlayers = categoriesState[categoryId] || [];
			if (currentCategoryPlayers.length >= category.slots) {
				// Категория уже заполнена
				setError(`Категория ${category.name} уже заполнена`);
				return;
			}

			// Отправка голоса на сервер
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

			// Обновление статистики
			const updatedStats = await api.getUserVotingStats(user.id);
			setUserStats(updatedStats);

			if (
				currentPlayerIndex + 1 >= players.length ||
				updatedStats.totalVoted === updatedStats.totalPlayers
			) {
				setIsCompleted(true);
			}
		} catch (err) {
			console.error('Ошибка при отправке голоса:', err);
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
