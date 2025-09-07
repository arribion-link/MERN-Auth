
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './auth/Register';
import Login from './auth/Login';
// import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/api/auth/register" element={<Register/>} />
        <Route path="/api/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App
