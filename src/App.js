import './App.css';
import Navb from './components/Navb';
import ProductList from './components/ProductList';
import CourceList from './components/CourceList';
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Users from './components/Users';

function App() {
  return (
    <div className="App">
     
      <Router>
      <Navb/>
          <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cource" element={<CourceList />} />
          <Route path="/users" element={<Users />} />
          </Routes>
          </Router>
    </div>
  );
}

export default App;
