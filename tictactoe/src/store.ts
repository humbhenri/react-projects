import { Action, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

type Cell = "X" | "O" | "";
type Winner = "X" | "O" | "?" | "=";

interface TicTacToeState {
  board: Cell[][];
  nextPlayer: "X" | "O";
  winner: Winner;
}

function getWinner(board: Cell[][]): Winner {
  const players: ("X" | "O")[] = ["X", "O"];
  for (let p of players) {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === p && board[i][1] === p && board[i][2] === p) {
        return p;
      }
      if (board[0][i] === p && board[1][i] === p && board[2][i] === p) {
        return p;
      }
    }
    if (board[0][0] === p && board[1][1] === p && board[2][2] === p) {
      return p;
    }
    if (board[0][2] === p && board[1][1] === p && board[2][0] === p) {
      return p;
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return "?";
      }
    }
  }
  return "=";
}

const initialState: TicTacToeState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  nextPlayer: "X",
  winner: "?",
};

type ActionPlay = PayloadAction<{ i: number; j: number }, "play">;
type ActionReset = Action<"reset">;

function ticTacToeReducer(
  state = initialState,
  action: ActionPlay | ActionReset
): TicTacToeState {
  switch (action.type) {
    case "play":
      const board = state.board.map((row) => row.map((cell) => cell));
      const { i, j } = action.payload;
      if (board[i][j] === "" && getWinner(board) === "?") {
        board[i][j] = state.nextPlayer;
        return {
          nextPlayer: state.nextPlayer === "X" ? "O" : "X",
          board,
          winner: getWinner(board),
        };
      } else {
        return state;
      }
    case "reset":
        return initialState;
  }
  return state;
}

export const store = configureStore({
  reducer: { ticTacToe: ticTacToeReducer },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
