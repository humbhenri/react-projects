import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

import './App.css';
import CalendarScreen from './CalendarScreen';
import { getToday } from './services/date';

function App() {
    const mesAtual = getToday().slice(0, 7);
    return (
        <Router>
            <Routes>
                <Route
                    path="/calendar/:month"
                    element={<CalendarScreen />}
                ></Route>
                <Route
                    path="*"
                    element={<Navigate to={`/calendar/${mesAtual}`} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
