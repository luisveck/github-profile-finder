import Home from './pages/Home';
import Details from './pages/Details';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/user/:login" element={<Details />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
