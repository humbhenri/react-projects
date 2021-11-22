import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import CalendarScreen from "./CalendarScreen";
import LoginScreen from "./LoginScreen";
import { getUserEndpoint, IUser, signOutEndpoint } from "./services/backend";
import { getToday } from "./services/date";

function App() {
  const mesAtual = getToday().slice(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  async function onLogout() {
    setUser(null);
    await signOutEndpoint();
  }

  if (user) {
    return (
      <Router>
        <Routes>
          <Route
            path="/calendar/:month"
            element={<CalendarScreen user={user} onLogout={onLogout} />}
          ></Route>
          <Route path="*" element={<Navigate to={`/calendar/${mesAtual}`} />} />
        </Routes>
      </Router>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
