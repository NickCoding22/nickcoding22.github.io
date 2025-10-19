import './App.css';
import PageManager from './Components/PageManager.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from "react-router-dom";
import CS180 from './pages/CS180.jsx';
import CS180Proj2 from './pages/CS180Proj2.jsx';
import CS180Proj3 from './pages/CS180Proj3.jsx';

library.add(fas);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageManager />} />
        <Route path="/cs180" element={<CS180 />} />
        <Route path="/cs180proj2" element={<CS180Proj2 />} />
        <Route path="/cs180proj3" element={<CS180Proj3 />} />
      </Routes>
    </div>
  );
}

export default App;
