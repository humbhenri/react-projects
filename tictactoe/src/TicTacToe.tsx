import { useAppDispatch, useAppSelector, play, reset } from "./store";

export default function TicTacToe() {
  const state = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();

  const getTitle = () => {
    switch (state.winner) {
      case "=":
        return "Empatou!";
      case "?":
        return `Aguardando jogada de ${state.nextPlayer}`;
      default:
        return `${state.winner} ganhou!`;
    }
  };

  return (
    <section className="screen">
      <h1>{getTitle()}</h1>
      <table className="ticTacToe">
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} onClick={() => dispatch(play({i, j}))}>
                  <span>{cell}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => dispatch(reset())}>Reiniciar partida</button>
    </section>
  );
}
