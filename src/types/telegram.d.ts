interface TelegramWebApp {
	initData: string;
	initDataUnsafe: any;
	version: string;
	platform: string;
	themeParams: Record<string, string>;
	isExpanded: boolean;
	expand(): void;
	close(): void;
	ready(): void;
	sendData(data: string): void;
	HapticFeedback?: any;
}

export {};

declare global {
	interface Window {
		Telegram: {
			WebApp: TelegramWebApp;
		};
	}
}
