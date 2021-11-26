import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { authContext } from "./authContext";
import DespesasScreen from "./DespesasScreen";
import LoginScreen from "./LoginScreen";
import { getUser, IUser, logout } from "./services/backend";
import { getToday } from "./services/date";

function App() {
  const mesAtual = getToday().slice(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUser().then(setUser, () => setUser(null));
  }, []);

  async function onSignout() {
    setUser(null);
    await logout();
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignout }}>
        <Router>
          <Routes>
            <Route path="/despesas/:month" element={<DespesasScreen />}></Route>
            <Route
              path="*"
              element={<Navigate to={`/despesas/${mesAtual}`} />}
            />
          </Routes>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
