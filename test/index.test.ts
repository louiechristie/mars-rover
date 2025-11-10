import { describe, it } from "node:test";
import assert from "node:assert";

import execute, { move, turnLeft, turnRight, Direction } from "../index.ts";

import type { State } from "../index";

const initialState: State = {
  position: { x: 0, y: 0 },
  direction: Direction.North,
};

describe("Test rover", () => {
  describe("Test rover movement forward", () => {
    it("should not move if input is empty string", () => {
      const input = "";
      const output = execute(input);
      assert.equal(output, "0:0:N");
    });

    it("should move on space forward from 0:0 to 0:1", () => {
      const input = "M";
      const output = execute(input);
      assert.equal(output, "0:1:N");
    });

    it("should move two spaces forward from 0:0 to 0:2", () => {
      const input = "MM";
      const output = execute(input);
      assert.equal(output, "0:2:N");
    });

    it("should move three spaces forward from 0:0 to 0:3", () => {
      const input = "MMM";
      const output = execute(input);
      assert.equal(output, "0:3:N");
    });

    it("move to 0:9 if input is nine x 'M'", () => {
      const input = "MMMMMMMMM";
      const output = execute(input);
      assert.equal(output, "0:9:N");
    });

    it("should move to 0:0 if input is 10 x 'M', it should loop around", () => {
      const input = "MMMMMMMMMM";
      const output = execute(input);
      assert.equal(output, "0:0:N");
    });

    it("should move to 0:1 if input is 11 x 'M'", () => {
      const input = "M".repeat(11);
      const output = execute(input);
      assert.equal(output, "0:1:N");
    });
  });

  describe("Test rover rotate", () => {
    it("should face E if rotated right", () => {
      const input = "R";
      const output = execute(input);
      assert.equal(output, "0:0:E");
    });

    it("should face S if rotated right twice", () => {
      const input = "RR";
      const output = execute(input);
      assert.equal(output, "0:0:S");
    });

    it("should face E if rotated right 3 times", () => {
      const input = "RRR";
      const output = execute(input);
      assert.equal(output, "0:0:W");
    });

    it("should face N if rotated right 4 times", () => {
      const input = "RRRR";
      const output = execute(input);
      assert.equal(output, "0:0:N");
    });

    it("should face E if rotated right 5 times", () => {
      const input = "RRRRR";
      const output = execute(input);
      assert.equal(output, "0:0:E");
    });
  });

  describe("Move", () => {
    it("should move one forward", () => {
      const beforeState = {
        ...initialState,
      };
      const afterState = {
        ...beforeState,
        position: {
          ...beforeState.position,
          y: 1,
        },
      };

      assert.deepEqual(move(beforeState), afterState);
    });
  });

  describe("Turn right", () => {
    it("should turn right", () => {
      const beforeState = {
        ...initialState,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.East,
      };

      assert.deepEqual(turnRight(beforeState), afterState);
    });

    it("should turn right from N to E", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.North,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.East,
      };

      assert.deepEqual(turnRight(beforeState), afterState);
    });

    it("should turn right from E to S", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.East,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.South,
      };

      assert.deepEqual(turnRight(beforeState), afterState);
    });

    it("should turn right from S to W", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.South,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.West,
      };

      assert.deepEqual(turnRight(beforeState), afterState);
    });

    it("should turn right from W to N", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.West,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.North,
      };

      assert.deepEqual(turnRight(beforeState), afterState);
    });
  });

  describe("Turn Left", () => {
    it("should turn Left", () => {
      const beforeState = {
        ...initialState,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.West,
      };

      assert.deepEqual(turnLeft(beforeState), afterState);
    });

    it("should turn Left from N to W", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.North,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.West,
      };

      assert.deepEqual(turnLeft(beforeState), afterState);
    });

    it("should turn Left from W to S", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.West,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.South,
      };

      assert.deepEqual(turnLeft(beforeState), afterState);
    });

    it("should turn Left from S to E", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.South,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.East,
      };

      assert.deepEqual(turnLeft(beforeState), afterState);
    });

    it("should turn Left from E to N", () => {
      const beforeState = {
        ...initialState,
        direction: Direction.East,
      };
      const afterState = {
        ...beforeState,
        direction: Direction.North,
      };

      assert.deepEqual(turnLeft(beforeState), afterState);
    });
  });

  describe("Move then rotate", () => {
    it("should move then rotate right", () => {
      const input = "MR";
      const output = execute(input);
      assert.equal(output, "0:1:E");
    });

    it("should move then rotate left", () => {
      const input = "ML";
      const output = execute(input);
      assert.equal(output, "0:1:W");
    });
  });

  describe("Rotate then move", () => {
    it("rotate right then move", () => {
      const input = "RM";
      const output = execute(input);
      assert.equal(output, "1:0:E");
    });

    it("rotate left then move", () => {
      const input = "LM";
      const output = execute(input);
      assert.equal(output, "9:0:W");
    });
  });

  describe("Acceptance tests", () => {
    it("given a grid with no obstacles, input MMRMMLM gives output 2:3:N", () => {
      const input = "MMRMMLM";
      const output = execute(input);
      assert.equal(output, "2:3:N");
    });

    it("given a grid with no obstacles, input MMMMMMMMMM gives output 0:0:N", () => {
      const input = "MMMMMMMMMM";
      const output = execute(input);
      assert.equal(output, "0:0:N");
    });

    it("given a grid with no obstacles, input RMMLM gives output 2:1:N", () => {
      const input = "RMMLM";
      const output = execute(input);
      assert.equal(output, "2:1:N");
    });
  });

  describe("Catch bad input", () => {
    it("should throw and error if given bad input", () => {
      const input = "X";
      assert.throws(
        () => {
          execute(input);
        },
        {
          message:
            "X is not a valid input command, must be one of: 'M', 'L', 'R'",
        }
      );
    });

    it("should throw and error if given input with invalid command in middle MMMMRMLMIMMM", () => {
      const input = "MMMMRMLMIMMM";
      assert.throws(
        () => {
          execute(input);
        },
        {
          message:
            "I is not a valid input command, must be one of: 'M', 'L', 'R'",
        }
      );
    });

    it("should throw and error if given input is not a string", () => {
      const input = 1;
      assert.throws(
        () => {
          // @ts-ignore
          return execute(input);
        },
        {
          message:
            "1 is not a valid input commands, must be a string of: 'M', 'L', 'R' e.g. MMRMLM",
        }
      );
    });
  });
});
