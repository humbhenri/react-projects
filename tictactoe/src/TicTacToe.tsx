import { Action, configureStore, PayloadAction } from "@reduxjs/toolkit";

type Cell = "X" | "O" | "";

interface TicTacToeState {
  board: Cell[][];
  nextPlayer: "X" | "O";
}

const initialState: TicTacToeState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  nextPlayer: "X",
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
      return {
        nextPlayer: state.nextPlayer === "X" ? "O" : "X",
        board,
      };
    case "reset":
  }
  return state;
}

const store = configureStore({
  reducer: { ticTacToe: ticTacToeReducer },
});

export default function TicTacToe() {
  const state: TicTacToeState = initialState;

  return (
    <section className="screen">
      <h1>Aguardando jogada de {state.nextPlayer}</h1>
      <table className="ticTacToe">
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}><span>{cell}</span></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button>Reiniciar partida</button>
    </section>
  );
}
