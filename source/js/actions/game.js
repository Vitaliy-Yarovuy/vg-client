
export const HIT_ACTION = 'HIT_ACTION';
export const START_SINGLE_GAME_ACTION = 'START_SINGLE_GAME_ACTION';

export function startSingleGame() {
  return {
    type: START_SINGLE_GAME_ACTION
  };
}

export function hit(team, index) {
  return {
    type: HIT_ACTION,
    data: {team, index}
  };
}
