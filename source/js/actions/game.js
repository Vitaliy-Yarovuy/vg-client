
export const HIT_ACTION = 'HIT_ACTION';

export function hit(team, index) {
  return {
    type: HIT_ACTION,
    data: {team, index}
  };
}
