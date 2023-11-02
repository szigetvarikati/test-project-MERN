import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>
                Netlient Kft. - Teszt feladat - Készítette: Szigetvári Katalin
              </Navbar.Brand>
            </LinkContainer>
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
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
