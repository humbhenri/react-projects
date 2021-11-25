import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import TicTacToe from "./TicTacToe";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TicTacToe />
      </Provider>
    </div>
  );
}

export default App;
