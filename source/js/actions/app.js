
export const SENDING_REQUEST = 'SENDING_REQUEST';

export function sendingRequest(data) {
  return { 
  	type: SENDING_REQUEST, 
  	data, 
  };
}