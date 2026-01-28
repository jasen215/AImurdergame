export type GameState = {
  homemindUnlocked: boolean;
  adminUnlocked: boolean;
  forumCluesFound: number;
  forumCluesTotal: number;
};

export const initialGameState: GameState = {
  homemindUnlocked: true,
  adminUnlocked: false,
  forumCluesFound: 0,
  forumCluesTotal: 3,
};
