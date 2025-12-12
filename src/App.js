import './App.css';
import PageManager from './Components/PageManager.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from "react-router-dom";
import CS180 from './pages/CS180.jsx';
import CS180Proj2 from './pages/CS180Proj2.jsx';
import CS180Proj3 from './pages/CS180Proj3.jsx';
import CS180Proj4 from './pages/CS180Proj4.jsx';
import CS180Proj5 from './pages/CS180Proj5.jsx';

library.add(fas);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PageManager />} />
        <Route path="/cs180" element={<CS180 />} />
        <Route path="/cs180proj2" element={<CS180Proj2 />} />
        <Route path="/cs180proj3" element={<CS180Proj3 />} />
        <Route path="/cs180proj4" element={<CS180Proj4 />} />
        <Route path="/cs180proj5" element={<CS180Proj5 />} />
      </Routes>
    </div>
  );
}

export default App;
