export interface TelegramUser {
	id: string;
	username?: string;
	firstname?: string;
	lastname?: string;
	isAdmin: boolean;
}

export interface Category {
	id: string;
	name: string;
	color?: string;
	slots?: number;
}

export interface Player {
	id: string;
	name: string;
	photoUrl?: string;
	releaseId: string;
	shirtNumber?: number;
}

export interface Release {
	id: string;
	name: string;
	logoUrl?: string;
}

export interface Vote {
	id: string;
	telegramUserId: string;
	playerId: string;
	categoryId: string;
	createdAt: string;
	player?: Player;
	category?: Category;
}

export interface UserVotingStats {
	totalVoted: number;
	totalPlayers: number;
	progress: number;
	votesPerCategory: Record<string, number>;
}

export interface VotingResult {
	categoryId: string;
	categoryName: string;
	categoryColor?: string;
	players: {
		id: string;
		name: string;
		photoUrl?: string;
		votes: number;
	}[];
}
