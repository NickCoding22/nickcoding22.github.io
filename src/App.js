import './App.css';
import PageManager from './Components/PageManager.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App() {
  return (
    <PageManager />
  );
}

export default App;
