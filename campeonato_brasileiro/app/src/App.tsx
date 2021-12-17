import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/year/:year" element={<MainScreen />}></Route>
        <Route path="*" element={<Navigate to={`/year/2003`} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
