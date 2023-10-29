import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductTable from './screens/ProductTable';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">
            Netlient Kft. - Teszt feladat - Készítette: Szigetvári Katalin
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/products" element={<ProductTable />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
