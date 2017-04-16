import { CELL_TYPES, SIDE_SIZE, TEAMS,
  CELL_RED_TYPES, CELL_GREEN_TYPES,
  CELL_AVAILABLE_FOR_RED_TYPES, CELL_AVAILABLE_FOR_GREEN_TYPES
  } from 'structures/game';
import _ from 'lodash';


const NEIGHBORHOODS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

const toIndex = p => p[0] + p[1] * SIDE_SIZE;
const toPoint = index => [index % SIDE_SIZE, Math.floor(index / SIDE_SIZE)];

const getNeighbors = (index)=>{
  const point = toPoint(index);
  return  NEIGHBORHOODS
    .map(p => _.zipWith(p, point, _.add))
    .filter(p => p.every(a => a >= 0 && a < SIDE_SIZE))
    .map(toIndex);
};




export const searchAvailableCell = (team, cells)=>{
  const isRed = team === TEAMS.RED;
  const cellAvailableType = isRed ? CELL_AVAILABLE_FOR_RED_TYPES : CELL_AVAILABLE_FOR_GREEN_TYPES;
  const cellAliveType = isRed ? CELL_TYPES.RED : CELL_TYPES.GREEN;
  const cellDedType = isRed ? CELL_TYPES.GREEN_DEAD : CELL_TYPES.RED_DEAD;

  const availableCells = cells.map((v,i)=>[v,i])
    .filter(([v,i])=> v === cellAliveType )
    .map(([v,i])=> i);

  const markedCells = availableCells.slice();
  const foundIndexes = [];
  let start;


  while((start = availableCells.pop()) !== undefined){
    let neighbors = getNeighbors(start);

    neighbors.forEach((index)=>{
        if(cellAvailableType.includes(cells[index]) && !foundIndexes.includes(index)){
          foundIndexes.push(index);
        }
        if(cells[index] === cellDedType && !markedCells.includes(index) && !availableCells.includes(index)){
          markedCells.push(index);
          availableCells.push(index);
        }
      });
  }

  return foundIndexes;
};