import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api';
import type { TelegramUser } from '../types/api';

interface UserContextProps {
	user: TelegramUser | null;
	isLoading: boolean;
	error: string | null;
}

const UserContext = createContext<UserContextProps>({
	user: null,
	isLoading: true,
	error: null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<TelegramUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const initUser = async () => {
			try {
				// Получаем данные из Telegram WebApp
				const tg = window.Telegram?.WebApp;
				if (!tg) {
					throw new Error('Telegram WebApp не найден');
				}

				// Получаем initData из Telegram
				// @ts-ignore - игнорируем проблему типизации, т.к. initData существует в объекте WebApp
				const initData = tg.initData || '';
				if (!initData) {
					throw new Error('Не удалось получить данные инициализации Telegram');
				}

				// Отправляем initData на бэкенд для получения пользователя
				const userData = await api.getTelegramUser(initData);
				setUser(userData);
			} catch (err) {
				console.error('Ошибка при получении пользователя:', err);
				setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
			} finally {
				setIsLoading(false);
			}
		};

		initUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, isLoading, error }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);

export default UserContext;
