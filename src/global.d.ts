declare global {
	interface Window {
		Telegram: {
			WebApp: {
				ready: () => void;
				expand: () => void;
				requestFullscreen?: () => void;
			};
		};
	}
}

export {};
