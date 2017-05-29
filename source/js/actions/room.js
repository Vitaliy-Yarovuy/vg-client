
export const ENTER_ROOM_ACTION= 'ENTER_ROOM_ACTION';
export const LEAVE_ROOM_ACTION = 'LEAVE_ROOM_ACTION';

export function enterRoomStart() {
  return {
    type: ENTER_ROOM_ACTION
  };
}

export function leaveRoom() {
  return {
    type: LEAVE_ROOM_ACTION,
  };
}
