import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Navbar bg="dark" variant="dark">
          <Container className='mx-auto'>
            <Navbar.Brand  className="text-center mx-auto">
              Netlient Kft. - Teszt feladat - Készítette: Szigetvári Katalin
            </Navbar.Brand>
          </Container>
        </Navbar>

        <main>
          <Container>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/products" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">Minden jog fenntartva</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
