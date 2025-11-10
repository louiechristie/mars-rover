type Position = {
  x: number;
  y: number;
};

export enum Direction {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

export type State = {
  position: Position;
  direction: Direction;
};

const initialState: State = {
  position: { x: 0, y: 0 },
  direction: Direction.North,
};

export const move = (state: State): State => {
  let y = state.position.y;
  let x = state.position.x;
  let direction = state.direction;

  switch (direction) {
    case Direction.North: {
      y++;
      if (y >= 10) {
        y = y - 10;
      }
      break;
    }
    case Direction.East: {
      x++;
      if (x >= 10) {
        x = x - 10;
      }
      break;
    }
    case Direction.South: {
      y--;
      if (y < 0) {
        y = y + 10;
      }
      break;
    }
    case Direction.West: {
      x--;
      if (x < 0) {
        x = x + 10;
      }
      break;
    }
  }

  return {
    position: { x, y },
    direction: direction,
  };
};

export const turnRight = (state: State): State => {
  let direction = state.direction;

  switch (direction) {
    case Direction.North: {
      direction = Direction.East;
      break;
    }
    case Direction.East:
      direction = Direction.South;
      break;
    case Direction.South:
      direction = Direction.West;
      break;
    default:
      direction = Direction.North;
  }

  const afterState = {
    ...state,
    direction,
  };

  return afterState;
};

export const turnLeft = (state: State): State => {
  let direction = state.direction;

  switch (direction) {
    case Direction.North: {
      direction = Direction.West;
      break;
    }
    case Direction.West:
      direction = Direction.South;
      break;
    case Direction.South:
      direction = Direction.East;
      break;
    default:
      direction = Direction.North;
  }

  const afterState = {
    ...state,
    direction,
  };

  return afterState;
};

const doCommand = (state: State, command: string): State => {
  switch (command) {
    case "M": {
      return move(state);
    }
    case "R": {
      return turnRight(state);
    }
    case "L": {
      return turnLeft(state);
    }
  }
};

const execute = (command: string): string => {
  let state = initialState;

  if (command.length) {
    const commandArray = command.split("");

    commandArray.forEach((command) => {
      state = doCommand(state, command);
    });

    return `${state.position.x}:${state.position.y}:${state.direction}`;
  }
  return `0:0:N`;
};

export default execute;
