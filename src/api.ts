// API клиент для взаимодействия с бэкендом

// Базовый URL API
import { API_URL } from './config';

// Вспомогательная функция для проверки ответа
const checkResponse = async (response: Response) => {
	if (!response.ok) {
		const error = await response.json().catch(() => ({
			message: 'Ошибка сервера',
		}));
		throw new Error(error.message || `Ошибка ${response.status}`);
	}
	return response.json();
};

// Получение telegram данных пользователя
const getTelegramUser = async (initData: string) => {
	const response = await fetch(`${API_URL}/telegram/webhook`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ initData }),
	});
	return checkResponse(response);
};

// Получение всех категорий
const getCategories = async () => {
	const response = await fetch(`${API_URL}/categories`);
	return checkResponse(response);
};

// Получение результатов голосования
const getVotingResults = async () => {
	const response = await fetch(`${API_URL}/categories/results`);
	return checkResponse(response);
};

// Получение релиза по ID
const getReleaseById = async (id: string) => {
	const response = await fetch(`${API_URL}/releases/${id}`);
	return checkResponse(response);
};

// Получение всех игроков релиза
const getReleasePlayers = async (releaseId: string) => {
	const response = await fetch(`${API_URL}/releases/${releaseId}/players`);
	return checkResponse(response);
};

// Получение следующего игрока для голосования
const getNextPlayerForVoting = async (telegramUserId?: string) => {
	let url = `${API_URL}/votes/players/next`;
	if (telegramUserId) {
		url += `?telegramId=${telegramUserId}`;
	}
	const response = await fetch(url);
	return checkResponse(response);
};

// Получение всех игроков для голосования
const getPlayersForVoting = async (telegramUserId?: string) => {
	let url = `${API_URL}/votes/players`;
	if (telegramUserId) {
		url += `?telegramId=${telegramUserId}`;
	}
	const response = await fetch(url);
	return checkResponse(response);
};

// Добавление голоса
const addVote = async (data: {
	telegramUserId: string;
	playerId: string;
	categoryId: string;
}) => {
	const response = await fetch(`${API_URL}/votes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			telegramId: data.telegramUserId,
			playerId: data.playerId,
			categoryId: data.categoryId,
		}),
	});
	return checkResponse(response);
};

// Получение статистики голосования пользователя
const getUserVotingStats = async (telegramUserId?: string) => {
	let url = `${API_URL}/votes/user-stats`;
	if (telegramUserId) {
		url += `?telegramId=${telegramUserId}`;
	}
	const response = await fetch(url);
	return checkResponse(response);
};

export const api = {
	getTelegramUser,
	getCategories,
	getVotingResults,
	getReleaseById,
	getReleasePlayers,
	getNextPlayerForVoting,
	getPlayersForVoting,
	addVote,
	getUserVotingStats,
};

export default api;
