import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
