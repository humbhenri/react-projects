import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import DespesasScreen from "./DespesasScreen";
import { getToday } from "./services/date";

function App() {
  const mesAtual = getToday().slice(0, 7);
  return (
    <Router>
      <Routes>
        <Route path="/despesas/:month" element={<DespesasScreen />}></Route>
        <Route path="*" element={<Navigate to={`/despesas/${mesAtual}`} />} />
      </Routes>
    </Router>
  );
}

export default App;
