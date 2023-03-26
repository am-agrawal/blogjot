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
        <Route path='/' element={<Main />} replace={true} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/*' element={<Main />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
