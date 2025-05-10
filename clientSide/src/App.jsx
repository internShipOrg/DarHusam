import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import News from "./components/NewsEvents/News"; // Adjust the import path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default App;
