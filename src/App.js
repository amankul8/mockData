import './App.css';
import Main from './pages/Main';
import NotFound from './pages/404';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/home" element={<Navigate to="/" replace/>} />
      <Route path="/main" element={<Navigate to="/" replace/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
