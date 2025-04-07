// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Screens/HomePage';
import GeneratePage from './Screens/GeneratePage';
import LoginPage from './Screens/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeneratePage />} />
        <Route path="/tecflow-overview" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;