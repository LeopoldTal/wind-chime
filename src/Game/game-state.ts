export type GameState = {
	happyMemories: number;
	sadMemories: number;
};

export const getBlankState = (): GameState => ({
	happyMemories: 0,
	sadMemories: 0
});
